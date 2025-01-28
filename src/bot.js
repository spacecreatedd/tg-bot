const { Bot } = require('grammy');
const config = require('./config/botConfig');
const helpCommand = require('./commands/help');
const startCommand = require('./commands/start');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const escapeMarkdown = require('./utils/escapeMarkdown');

const bot = new Bot(config.token); 

// подключаем команды
bot.command('help', helpCommand);
bot.command('start', startCommand);

// покдлючаем middleware
bot.use(logger);      // Логирование
bot.use(errorHandler); // Обработка ошибок

// Обработчик нажатий кнопок
bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data === 'play') {
        await ctx.reply('Напишите число от 0 до 10 включительно:');
    } else if (data === 'help') {
        await ctx.reply('Чтобы начать игру, используйте команду /start.');
    } else if (data === 'exit') {
        await ctx.reply('GG!');
    }
});

// Обработка текста (чисел от 0 до 10)
bot.on('message:text', async (ctx) => {
    const userInput = ctx.message.text.trim();
    const userGuess = parseInt(userInput);

    if (isNaN(userGuess) || userGuess < 0 || userGuess > 10) {
        await ctx.reply('Введите число от 0 до 10 включительно.');
    } else {
        const result = Math.floor(Math.random() * 11);

        const resultMessage = userGuess === result
            ? `Вы угадали, бот выбрал ${result}. `
            : `Вы проиграли, бот выбрал ${result}. `;

        // Экранирование текста перед отправкой
        const safeMessage = escapeMarkdown(resultMessage);

        await ctx.reply(safeMessage, { parse_mode: 'MarkdownV2' });

        await ctx.reply('<i>Хотите сыграть снова?</i>', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Играть снова', callback_data: 'play' }],
                    [{ text: 'Выйти', callback_data: 'exit' }],
                ]
            },
            parse_mode: 'HTML'
        });
    }
});

module.exports = bot;
