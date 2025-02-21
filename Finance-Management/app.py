from flask import Flask, render_template, request, redirect, url_for, flash, make_response, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, login_required, logout_user, current_user, LoginManager
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import csv
import io
import openpyxl
from io import BytesIO
from sqlalchemy.orm import aliased
from sqlalchemy import or_

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///finance.db'
app.config['SECRET_KEY'] = 'your_secret_key'
db = SQLAlchemy(app)

# Initialize LoginManager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # Redirect to login page if not authenticated

# User Model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

# Transaction Model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('transactions', lazy=True))

# Load user function for Flask-Login
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            login_user(user)
            flash("Login Successful!", "success")
            return redirect(url_for('transactions'))
        else:
            flash("Invalid username or password", "danger")
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash("Logged out successfully!", "success")
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if not username or not password:
            flash("Both username and password are required", "danger")
            return render_template('register.html')

        # Check if the username is already taken
        if User.query.filter_by(username=username).first():
            flash("Username already exists! Please choose a different one.", "danger")
            return render_template('register.html')

        hashed_password = generate_password_hash(password)

        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        try:
            db.session.commit()
            flash("Account created successfully!", "success")
            return redirect(url_for('login'))
        except Exception as e:
            db.session.rollback()
            flash(f"Error creating account: {str(e)}", "danger")
            return render_template('register.html')

    return render_template('register.html')

@app.route('/add_transaction', methods=['GET', 'POST'])
@login_required
def add_transaction():
    if request.method == 'POST':
        date = request.form['date']
        description = request.form['description']
        category = request.form['category']
        amount = request.form['amount']

        # Validate inputs
        if not date or not description or not category or not amount:
            flash("All fields are required", "danger")
            return redirect(url_for('add_transaction'))

        try:
            amount = float(amount)
        except ValueError:
            flash("Amount must be a valid number", "danger")
            return redirect(url_for('add_transaction'))

        if amount <= 0:
            flash("Amount must be greater than zero", "danger")
            return redirect(url_for('add_transaction'))

        try:
            # Validate the date format
            datetime.strptime(date, '%Y-%m-%d')  # Ensure the date is in the correct format (YYYY-MM-DD)
        except ValueError:
            flash("Invalid date format! Please use YYYY-MM-DD.", "danger")
            return redirect(url_for('add_transaction'))

        new_transaction = Transaction(date=date, description=description, category=category, amount=amount, user_id=current_user.id)
        db.session.add(new_transaction)
        try:
            db.session.commit()
            flash("Transaction added successfully!", "success")
            return redirect(url_for('transactions'))
        except Exception as e:
            db.session.rollback()
            flash(f"Error adding transaction: {str(e)}", "danger")
            return redirect(url_for('add_transaction'))

    return render_template('add_transaction.html')

@app.route('/transactions')
@login_required
def transactions():
    search_query = request.args.get('search', '')
    # Fetch transactions for the current user only
    try:
        if search_query:
            transactions = Transaction.query.filter(
                Transaction.user_id == current_user.id,
                or_(
                    Transaction.description.like(f'%{search_query}%'),
                    Transaction.category.like(f'%{search_query}%'),
                    Transaction.date.like(f'%{search_query}%')
                )
            ).all()
        else:
            transactions = Transaction.query.filter_by(user_id=current_user.id).all()
    except Exception as e:
        flash(f"Error fetching transactions: {str(e)}", "danger")
        transactions = []

    return render_template('transactions.html', transactions=transactions)

@app.route('/edit_transaction/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_transaction(id):
    transaction = Transaction.query.filter_by(id=id, user_id=current_user.id).first()

    if not transaction:
        flash("You don't have permission to edit this transaction", "danger")
        return redirect(url_for('transactions'))

    if request.method == 'POST':
        date = request.form['date']
        description = request.form['description']
        category = request.form['category']
        amount = request.form['amount']

        if not date or not description or not category or not amount:
            flash("All fields are required", "danger")
            return redirect(url_for('edit_transaction', id=id))

        try:
            amount = float(amount)
        except ValueError:
            flash("Amount must be a valid number", "danger")
            return redirect(url_for('edit_transaction', id=id))

        if amount <= 0:
            flash("Amount must be greater than zero", "danger")
            return redirect(url_for('edit_transaction', id=id))

        try:
            # Validate the date format
            datetime.strptime(date, '%Y-%m-%d')
        except ValueError:
            flash("Invalid date format! Please use YYYY-MM-DD.", "danger")
            return redirect(url_for('edit_transaction', id=id))

        transaction.date = date
        transaction.description = description
        transaction.category = category
        transaction.amount = amount

        try:
            db.session.commit()
            flash("Transaction updated successfully!", "success")
            return redirect(url_for('transactions'))
        except Exception as e:
            db.session.rollback()
            flash(f"Error updating transaction: {str(e)}", "danger")
            return redirect(url_for('edit_transaction', id=id))

    return render_template('edit_transaction.html', transaction=transaction)

@app.route('/delete_transaction/<int:id>', methods=['POST'])
@login_required
def delete_transaction(id):
    transaction = Transaction.query.filter_by(id=id, user_id=current_user.id).first()

    if not transaction:
        flash("You don't have permission to delete this transaction", "danger")
        return redirect(url_for('transactions'))

    try:
        db.session.delete(transaction)
        db.session.commit()
        flash("Transaction deleted successfully!", "success")
    except Exception as e:
        db.session.rollback()
        flash(f"Error deleting transaction: {str(e)}", "danger")

    return redirect(url_for('transactions'))

@app.route('/report')
@login_required
def report():
    try:
        transactions = Transaction.query.filter_by(user_id=current_user.id).all()
        total_amount = sum(t.amount for t in transactions)
        return render_template('report.html', total_amount=total_amount)
    except Exception as e:
        flash(f"Error generating report: {str(e)}", "danger")
        return redirect(url_for('transactions'))

@app.route('/export')
@login_required
def export_transactions():
    try:
        transactions = Transaction.query.filter_by(user_id=current_user.id).all()
        output = io.StringIO()
        writer = csv.writer(output)

        # Write headers
        writer.writerow(['Date', 'Description', 'Category', 'Amount'])

        # Write transaction data
        for transaction in transactions:
            writer.writerow([transaction.date, transaction.description, transaction.category, transaction.amount])

        output.seek(0)
        response = make_response(output.getvalue())
        response.headers['Content-Disposition'] = 'attachment; filename=transactions.csv'
        response.headers['Content-Type'] = 'text/csv'
        return response
    except Exception as e:
        flash(f"Error exporting transactions: {str(e)}", "danger")
        return redirect(url_for('transactions'))

@app.route('/export_excel')
@login_required
def export_excel():
    try:
        transactions = Transaction.query.filter_by(user_id=current_user.id).all()

        # Create a new workbook and a sheet
        wb = openpyxl.Workbook()
        sheet = wb.active
        sheet.title = "Transactions"

        # Add headers
        sheet['A1'] = 'Date'
        sheet['B1'] = 'Description'
        sheet['C1'] = 'Category'
        sheet['D1'] = 'Amount'

        # Add transaction data
        row = 2
        for transaction in transactions:
            sheet[f'A{row}'] = transaction.date
            sheet[f'B{row}'] = transaction.description
            sheet[f'C{row}'] = transaction.category
            sheet[f'D{row}'] = transaction.amount
            row += 1

        # Save to a BytesIO object
        output = BytesIO()
        wb.save(output)
        output.seek(0)

        # Send the Excel file as response
        return send_file(output, as_attachment=True, download_name="transactions.xlsx", mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    except Exception as e:
        flash(f"Error exporting transactions to Excel: {str(e)}", "danger")
        return redirect(url_for('transactions'))

# Run the app within the application context
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables within the app context
    app.run(host='0.0.0.0', port=5000, debug=True)
