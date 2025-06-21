import pandas as pd
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import ctypes

# Enable high-DPI awareness
try:
    ctypes.windll.shcore.SetProcessDpiAwareness(1)  # Per-monitor DPI awareness
except AttributeError:
    ctypes.windll.user32.SetProcessDPIAware()  # Fallback for older Windows

class AdvancedSearchApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Advanced Excel/CSV Search Tool")
        self.root.geometry("1750x938")  # Adjusted for 125% scaling
        self.df = None
        self.filtered_df = None
        self.sort_ascending = True
        self.last_sorted_column = None
        self.column_filters = {}
        self.setup_ui()

    def setup_ui(self):
        self.create_widgets()
        self.bind_shortcuts()

    def create_widgets(self):
        # Toolbar Frame
        toolbar = tk.Frame(self.root, height=50, bg="#f0f0f0")
        toolbar.pack(side="top", fill="x", pady=5)

        tk.Button(toolbar, text="📂 Load File", command=self.load_file, font=("Arial", 11), height=1, padx=5).pack(side="right", padx=5)
        tk.Button(toolbar, text="💾 Export Results", command=self.export_data, font=("Arial", 11), height=1, padx=5).pack(side="right", padx=5)
        tk.Button(toolbar, text="🔍 Check Duplicates/Empty", command=self.check_duplicates, font=("Arial", 11), height=1, padx=5).pack(side="right", padx=5)
        tk.Button(toolbar, text="🔄 Refresh Data", command=self.refresh_data, font=("Arial", 11), height=1, padx=5).pack(side="right", padx=5)
        tk.Button(toolbar, text="ℹ️ Info", command=self.show_info, font=("Arial", 11), height=1, padx=5).pack(side="right", padx=5)

        # Search Frame
        search_frame = tk.Frame(self.root, height=50, bg="#e0e0e0")
        search_frame.pack(side="top", fill="x", pady=5)

        tk.Label(search_frame, text="Search Column(s):", font=("Arial", 11)).pack(side="left", padx=10, pady=5)
        self.column_var = tk.StringVar()
        self.column_dropdown = ttk.Combobox(search_frame, textvariable=self.column_var, state="readonly", font=("Arial", 11), width=35)
        self.column_dropdown.pack(side="left", padx=10, pady=5)
        self.column_dropdown.bind("<<ComboboxSelected>>", lambda e: self.apply_filter())

        tk.Label(search_frame, text="Search Text:", font=("Arial", 11)).pack(side="left", padx=10, pady=5)
        self.search_entry = tk.Entry(search_frame, width=50, font=("Arial", 11))
        self.search_entry.pack(side="left", padx=10, pady=5)
        tk.Button(search_frame, text="Search", command=self.apply_filter, font=("Arial", 11), height=1, padx=5).pack(side="left", padx=10, pady=5)

        self.search_entry.bind("<KeyRelease>", lambda e: self.apply_filter())
        self.search_entry.bind("<Return>", lambda e: self.apply_filter())

        # Treeview
        tree_frame = tk.Frame(self.root)
        tree_frame.pack(fill="both", expand=True, padx=10, pady=10)

        self.tree = ttk.Treeview(tree_frame, style="Treeview")
        self.tree.pack(fill="both", expand=True)
        self.tree.bind("<Double-1>", self.edit_cell)
        self.tree.bind("<Button-1>", self.sort_column_event)
        self.tree.bind("<Button-3>", self.show_filter_menu)

        style = ttk.Style()
        style.configure("Treeview", font=("Arial", 11), rowheight=25)
        style.configure("Treeview.Heading", font=("Arial", 11, "bold"))

        vsb = ttk.Scrollbar(tree_frame, orient="vertical", command=self.tree.yview)
        vsb.pack(side="right", fill="y")
        self.tree.configure(yscrollcommand=vsb.set)

        hsb = ttk.Scrollbar(tree_frame, orient="horizontal", command=self.tree.xview)
        hsb.pack(side="bottom", fill="x")
        self.tree.configure(xscrollcommand=hsb.set)

    def bind_shortcuts(self):
        self.root.bind("<Control-l>", lambda e: self.load_file())
        self.root.bind("<Control-f>", lambda e: self.search_entry.focus())

    def load_file(self):
        file_path = filedialog.askopenfilename(filetypes=[("Excel or CSV", "*.xlsx *.xls *.csv")])
        if not file_path:
            return
        try:
            if file_path.endswith(".csv"):
                self.df = pd.read_csv(file_path)
            else:
                self.df = pd.read_excel(file_path, engine="openpyxl")
            self.df.columns = self.df.columns.str.strip()
            self.update_column_dropdown()
            self.refresh_tree(self.df)
            self.column_filters.clear()
        except Exception as e:
            messagebox.showerror("Error", str(e))

    def update_column_dropdown(self):
        self.column_dropdown['values'] = list(self.df.columns)
        if self.column_dropdown['values']:
            self.column_var.set(self.column_dropdown['values'][0])

    def get_selected_column(self):
        return self.column_var.get()

    def apply_filter(self, *args):
        if self.df is None:
            return
        column = self.get_selected_column()
        query = self.search_entry.get().strip()
        combined_mask = pd.Series([True] * len(self.df))

        if column and query:
            terms = [q.strip() for q in query.split(",") if q.strip()]
            mask = pd.Series([False] * len(self.df))
            series = self.df[column].astype(str).str.lower()
            for term in terms:
                mask |= series.str.contains(term.lower(), na=False)
            combined_mask &= mask

        for col, filter_text in self.column_filters.items():
            if filter_text:
                series = self.df[col].astype(str).str.lower()
                mask = series.str.contains(filter_text.lower(), na=False)
                combined_mask &= mask

        self.filtered_df = self.df[combined_mask]
        self.refresh_tree(self.filtered_df)

    def refresh_tree(self, data):
        self.tree.delete(*self.tree.get_children())
        self.tree["columns"] = list(data.columns)
        self.tree["show"] = "headings"

        for col in data.columns:
            max_width = max(data[col].astype(str).apply(len).max() * 9, 120)
            self.tree.column(col, anchor="center", width=max_width, minwidth=60, stretch=True)
            self.tree.heading(col, text=col, command=lambda _col=col: self.sort_column(_col))

        for _, row in data.iterrows():
            self.tree.insert("", "end", values=list(row))

    def edit_cell(self, event):
        region = self.tree.identify("region", event.x, event.y)
        if region != "cell":
            return
        row_id = self.tree.identify_row(event.y)
        col_id = self.tree.identify_column(event.x)
        col_index = int(col_id[1:]) - 1
        col_name = self.tree["columns"][col_index]
        item = self.tree.item(row_id)
        old_val = item["values"][col_index]

        popup = tk.Toplevel(self.root)
        popup.title("Edit Cell")
        popup.geometry("300x150")  # Increased size for better visibility
        popup.resizable(False, False)

        # Center the window
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - (300 // 2)
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - (150 // 2)
        popup.geometry(f"+{x}+{y}")

        content_frame = tk.Frame(popup)
        content_frame.pack(expand=True, fill="both", padx=15, pady=15)

        tk.Label(content_frame, text=f"Edit {col_name}:", font=("Arial", 11)).grid(row=0, column=0, pady=5, sticky="w")
        entry = tk.Entry(content_frame, font=("Arial", 11), width=30)
        entry.grid(row=1, column=0, pady=5, padx=5)
        entry.insert(0, old_val)
        entry.focus()

        button_frame = tk.Frame(content_frame)
        button_frame.grid(row=2, column=0, pady=10)

        tk.Button(button_frame, text="Save", command=lambda: self.save_edit(popup, entry, col_name, row_id), font=("Arial", 11)).pack(side="left", padx=5)
        tk.Button(button_frame, text="Cancel", command=popup.destroy, font=("Arial", 11)).pack(side="left", padx=5)

    def save_edit(self, window, entry, col_name, row_id):
        new_val = entry.get()
        idx = self.tree.index(row_id)
        self.df.at[idx, col_name] = new_val
        self.apply_filter()
        window.destroy()

    def export_data(self):
        if self.filtered_df is None or self.filtered_df.empty:
            messagebox.showwarning("No Data", "No filtered data to export.")
            return
        file_path = filedialog.asksaveasfilename(defaultextension=".xlsx", filetypes=[("Excel files", "*.xlsx"), ("CSV files", "*.csv")])
        if not file_path:
            return
        try:
            if file_path.endswith(".csv"):
                self.filtered_df.to_csv(file_path, index=False)
            else:
                self.filtered_df.to_excel(file_path, index=False)
            messagebox.showinfo("Exported", f"Data saved to:\n{file_path}")
        except Exception as e:
            messagebox.showerror("Error", str(e))

    def sort_column_event(self, event):
        region = self.tree.identify("region", event.x, event.y)
        if region == "heading":
            col_id = self.tree.identify_column(event.x)
            col_index = int(col_id[1:]) - 1
            col_name = self.tree["columns"][col_index]
            self.sort_column(col_name)

    def sort_column(self, col_name):
        if self.filtered_df is None:
            return
        if self.last_sorted_column == col_name:
            self.sort_ascending = not self.sort_ascending
        else:
            self.sort_ascending = True
            self.last_sorted_column = col_name
        self.filtered_df = self.filtered_df.sort_values(by=col_name, ascending=self.sort_ascending)
        self.refresh_tree(self.filtered_df)

    def check_duplicates(self):
        if self.df is None:
            return
        duplicates = self.df[self.df.duplicated()]
        empties = self.df[self.df.isnull().any(axis=1)]
        msg = f"Duplicates: {len(duplicates)} rows\nEmpty Cells: {len(empties)} rows"
        messagebox.showinfo("Check Result", msg)

    def refresh_data(self):
        if self.df is not None:
            self.refresh_tree(self.df)
            messagebox.showinfo("Info", "Data refreshed successfully.")

    def show_info(self):
        messagebox.showinfo("About", "Advanced Excel/CSV Search Tool\nVersion 1.0\nDeveloped by ENGINEER")

    def show_filter_menu(self, event):
        region = self.tree.identify("region", event.x, event.y)
        if region == "heading":
            col_id = self.tree.identify_column(event.x)
            col_index = int(col_id[1:]) - 1
            col_name = self.tree["columns"][col_index]

            menu = tk.Menu(self.root, tearoff=0)
            menu.add_command(label="Set Filter", command=lambda: self.set_filter(col_name))
            menu.add_command(label="Clear Filter", command=lambda: self.clear_filter(col_name))
            menu.post(event.x_root, event.y_root)

    def set_filter(self, col_name):
        filter_window = tk.Toplevel(self.root)
        filter_window.title(f"Filter {col_name}")
        filter_window.geometry("350x180")  # Increased size to prevent cropping
        filter_window.resizable(False, False)

        # Center the window
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - (350 // 2)
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - (180 // 2)
        filter_window.geometry(f"+{x}+{y}")

        content_frame = tk.Frame(filter_window)
        content_frame.pack(expand=True, fill="both", padx=15, pady=15)

        tk.Label(content_frame, text=f"Enter filter for {col_name}:", font=("Arial", 11)).grid(row=0, column=0, pady=10, sticky="w")
        filter_entry = tk.Entry(content_frame, font=("Arial", 11), width=40)
        filter_entry.grid(row=1, column=0, pady=10, padx=5)
        filter_entry.insert(0, self.column_filters.get(col_name, ""))

        button_frame = tk.Frame(content_frame)
        button_frame.grid(row=2, column=0, pady=10)

        tk.Button(button_frame, text="Apply", command=lambda: self.apply_filter_from_window(filter_window, filter_entry, col_name), font=("Arial", 11)).pack(side="left", padx=10)
        tk.Button(button_frame, text="Cancel", command=filter_window.destroy, font=("Arial", 11)).pack(side="left", padx=10)

    def apply_filter_from_window(self, window, entry, col_name):
        filter_text = entry.get().strip()
        self.column_filters[col_name] = filter_text if filter_text else None
        self.apply_filter()
        window.destroy()

    def clear_filter(self, col_name):
        if col_name in self.column_filters:
            del self.column_filters[col_name]
        self.apply_filter()

if __name__ == "__main__":
    root = tk.Tk()
    app = AdvancedSearchApp(root)
    root.mainloop()