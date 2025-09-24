from telegram import Update
from telegram.ext import ApplicationBuilder, MessageHandler, ContextTypes, filters
import pyautogui
import asyncio
import requests
from PIL import Image
import io
import pyperclip
import platform

# For Windows image clipboard
if platform.system() == 'Windows':
    import win32clipboard
    from io import BytesIO

TOKEN = '7841574416:AAFSWokjcOtjOCzvM9-qnb4GUxUmNYVDU1k'  # Replace with your bot token

# Function to handle text messages
async def receive_text(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text
    await update.message.reply_text("asus")
    await asyncio.sleep(0)
    for line in text.split('\n'):
        pyautogui.write(line)
        pyautogui.press('enter')

# Function to handle photos
async def receive_photo(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Photo received and copied to clipboard")
    
    # Get the largest resolution photo
    photo = update.message.photo[-1]
    file = await context.bot.get_file(photo.file_id)
    file_bytes = requests.get(file.file_path).content
    image = Image.open(io.BytesIO(file_bytes))

    # Copy image to clipboard
    copy_image_to_clipboard(image)

def copy_image_to_clipboard(image):
    if platform.system() == 'Windows':
        output = BytesIO()
        image.convert('RGB').save(output, 'BMP')
        data = output.getvalue()[14:]  # BMP header fix
        output.close()
        win32clipboard.OpenClipboard()
        win32clipboard.EmptyClipboard()
        win32clipboard.SetClipboardData(win32clipboard.CF_DIB, data)
        win32clipboard.CloseClipboard()
    else:
        print("Image clipboard copy not implemented for this OS.")

def main():
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(MessageHandler(filters.TEXT & (~filters.COMMAND), receive_text))
    app.add_handler(MessageHandler(filters.PHOTO, receive_photo))
    app.run_polling()

if __name__ == '__main__':
    print("Bot started")
    print("Listening for messages...")
    main()
