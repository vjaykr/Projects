
import keyboard
import time

class KeyboardCommandController:
    def __init__(self):
        self.is_running = False
        self.trigger_key = None
        
        print("Keyboard Command Controller Initialized")
        self.setup_trigger_key()
        print(f"Trigger key set: {self.trigger_key}")
        print("Press Ctrl+C to exit the program")
        
    def setup_trigger_key(self):
        """Ask user to press the key they want to use as trigger"""
        print("\n⌨️ Setting up your trigger key...")
        print("Press the key you want to use as trigger (e.g., F1, F2, Space, etc.):")
        
        event = keyboard.read_event()
        if event.event_type == keyboard.KEY_DOWN:
            self.trigger_key = event.name
            print(f"✅ Trigger key set to: {self.trigger_key}")
        
    def press_select_and_paste(self):
        """Press Win+Shift+T, wait 2 seconds, then press Ctrl+V and Enter"""
        print(f"Trigger key pressed: {self.trigger_key} → Executing action")
        # Press all keys for select
        keyboard.press('win')
        keyboard.press('shift')
        keyboard.press('t')
        # Brief delay
        time.sleep(0.05)
        # Release select keys
        keyboard.release('t')
        keyboard.release('shift')
        keyboard.release('win')
        print("Win+Shift+T released")
        
        # Wait 2 seconds
        time.sleep(5)
        
        # Press paste keys
        print("Pressing Ctrl+V")
        keyboard.press('ctrl')
        keyboard.press('v')
        time.sleep(0.05)
        keyboard.release('v')
        keyboard.release('ctrl')
        print("Ctrl+V released")
        
        # Press Enter
        print("Pressing Enter")
        keyboard.press('enter')
        time.sleep(0.05)
        keyboard.release('enter')
        print("Enter released")
        
    def on_key_press(self, event):
        """Handle key press events"""
        if event.name == self.trigger_key:
            self.press_select_and_paste()
        
    def start_monitoring(self):
        """Start monitoring for key presses"""
        self.is_running = True
        print(f"\n⌨️ Monitoring for '{self.trigger_key}' key press...")
        
        keyboard.on_press_key(self.trigger_key, lambda _: self.press_select_and_paste())
        
        try:
            while self.is_running:
                time.sleep(0.1)
        except KeyboardInterrupt:
            self.stop_monitoring()
                    
    def start_listening(self):
        """Start the keyboard monitor"""
        try:
            self.start_monitoring()
        except Exception as e:
            print(f"Error starting monitor: {e}")
            self.is_running = False
            
    def stop_monitoring(self):
        """Stop the keyboard monitor"""
        self.is_running = False
        keyboard.unhook_all()
        print("\nKeyboard monitoring stopped.")

def main():
    try:
        import keyboard
    except ImportError as e:
        print("Required module not installed. Please install it using:")
        print("pip install keyboard")
        return
    
    controller = KeyboardCommandController()
    
    print("🚀 Starting keyboard command controller...")
    print("Press your trigger key to execute the action.")
    
    try:
        controller.start_listening()
    except KeyboardInterrupt:
        print("\nProgram interrupted by user")
        controller.stop_monitoring()
    
    print("Keyboard command controller stopped.")


if __name__ == "__main__":
    main()