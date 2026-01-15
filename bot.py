
import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

API_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
MINI_APP_URL = os.getenv("MINI_APP_URL")

# Admin IDs list
ADMINS = [12345678, 87654321]

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Request contact and location button
    keyboard = [
        [KeyboardButton("📱 Ro'yxatdan o'tish (Telefon)", request_contact=True)],
        [KeyboardButton("📍 Joylashuvni yuborish", request_location=True)]
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True, one_time_keyboard=True)
    
    await update.message.reply_text(
        f"Salom {update.effective_user.first_name}! 🚀\n"
        "StudentsAi tizimiga xush kelibsiz. Davom etish uchun quyidagi tugmalar orqali ma'lumotlaringizni tasdiqlang:",
        reply_markup=reply_markup
    )

async def handle_contact(update: Update, context: ContextTypes.DEFAULT_TYPE):
    contact = update.message.contact
    await update.message.reply_text(
        f"Rahmat! Endi platformaga kiring:",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("StudentsAi Platformasi", web_app=WebAppInfo(url=MINI_APP_URL))]
        ])
    )

async def admin_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if user_id not in ADMINS:
        await update.message.reply_text("Kechirasiz, siz admin emassiz.")
        return

    stats = "📊 StudentsAi Statistikasi:\n\n" \
            "👤 Jami foydalanuvchilar: 1,240\n" \
            "📝 Bajarilgan testlar: 5,600\n" \
            "📈 Kunlik faol: 340\n\n" \
            "/users - Foydalanuvchilar ro'yxati\n" \
            "/broadcast - Hammaga xabar"
    
    await update.message.reply_text(stats)

if __name__ == '__main__':
    application = ApplicationBuilder().token(API_TOKEN).build()
    
    application.add_handler(CommandHandler('start', start))
    application.add_handler(CommandHandler('admin', admin_command))
    application.add_handler(MessageHandler(filters.CONTACT, handle_contact))
    
    print("StudentsAi Bot ishga tushdi...")
    application.run_polling()
