
import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes, MessageHandler, filters
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

API_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
MINI_APP_URL = os.getenv("MINI_APP_URL")

# Admin IDs list - Buni real db dan olish tavsiya etiladi
ADMINS = [5605784347] # O'zingizning Telegram ID'ingizni shu yerga yozing

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Register flow
    keyboard = [
        [KeyboardButton("📱 Raqamni ulashish", request_contact=True)],
        [KeyboardButton("📍 Joylashuvni ulashish", request_location=True)]
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True, one_time_keyboard=True)
    
    await update.message.reply_text(
        f"Salom {update.effective_user.first_name}! 👋\n"
        "StudentsAi platformasiga xush kelibsiz.\n\n"
        "To'liq imkoniyatlardan foydalanish uchun telefon raqamingizni yuboring:",
        reply_markup=reply_markup
    )

async def handle_contact(update: Update, context: ContextTypes.DEFAULT_TYPE):
    contact = update.message.contact
    # Bu yerda contact ma'lumotlarini bazaga saqlash mumkin
    await update.message.reply_text(
        "Rahmat! Endi platformaga kiring 🚀",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("StudentsAi'ni Ochish", web_app=WebAppInfo(url=MINI_APP_URL))]
        ])
    )

async def admin_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if user_id not in ADMINS:
        await update.message.reply_text("⛔️ Kechirasiz, bu buyruq faqat adminlar uchun.")
        return

    stats = (
        "👑 **STUDENTSAI ADMIN PANEL** 👑\n\n"
        "📊 **Statistika:**\n"
        "• Foydalanuvchilar: 4,821\n"
        "• Bugungi faollar: 128\n"
        "• Jami testlar: 15,200\n\n"
        "⚙️ **Buyruqlar:**\n"
        "/users - Foydalanuvchilar ro'yxati\n"
        "/ban - Bloklash\n"
        "/broadcast - Xabar yuborish"
    )
    
    await update.message.reply_text(stats, parse_mode='Markdown')

if __name__ == '__main__':
    application = ApplicationBuilder().token(API_TOKEN).build()
    
    application.add_handler(CommandHandler('start', start))
    application.add_handler(CommandHandler('admin', admin_command))
    application.add_handler(MessageHandler(filters.CONTACT, handle_contact))
    
    print("StudentsAi Bot running...")
    application.run_polling()
