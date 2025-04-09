import os
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Load secrets from .env
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
WEB_APP_URL = os.getenv("WEB_APP_URL")

# Start command (Optional)
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Welcome to the Casino Bot! Use /plinko to start playing 🎯")

# Plinko button with Mini App
async def plinko(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("🎮 Play Plinko", web_app=WebAppInfo(url=WEB_APP_URL))]
    ]
    await update.message.reply_text("Click below to play Plinko 🎯", reply_markup=InlineKeyboardMarkup(keyboard))

# Optional: Fake balance (placeholder)
async def balance(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # This can be replaced with real DB logic
    user_id = update.effective_user.id
    fake_balance = 1000  # Later get from DB
    await update.message.reply_text(f"Your current balance: ${fake_balance}")

if __name__ == "__main__":
    app = ApplicationBuilder().token(BOT_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("plinko", plinko))
    app.add_handler(CommandHandler("balance", balance))
    app.run_polling()


