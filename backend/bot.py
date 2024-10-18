from aiogram import Bot, Dispatcher, types
import asyncio
import config

bot = Bot(token=config.BOT_TOKEN)
dp = Dispatcher()


@dp.message(lambda message: message.text == "/start")
async def cmd_start(message: types.Message):
    await message.answer("Hello, World!")


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Bot is stopped")
