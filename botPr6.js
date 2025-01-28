const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7705697814:AAHn-EmR0g2rdbUPP0Mq0lr1urHnLYOy5pQ');

// команда /start
bot.command('start', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Играть', 'play')
        .row()
        .text('Помощь', 'help');

    ctx.reply('Привет, это бот по игре "Угадай число". Напиши /help для получения инструкций.', { reply_markup: keyboard });
});

// команда /help
bot.command('help', (ctx) => {
    ctx.reply('Чтобы начать игру, используйте команду /start. Напишите число от 0 до 10 и попробуйте угадать число бота.');
});

// обработка нажатий кнопок
bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data === 'play') {
        // начинаем игру, спрашиваем у пользователя число
        await ctx.reply('Напишите число от 0 до 10 включительно:');
    }
    // обработка помощи
    else if (data === 'help') {
        await ctx.answerCallbackQuery();
        await ctx.reply('Чтобы начать игру, используйте команду /start. Напишите число от 0 до 10 и попробуйте угадать число бота.');
    }
    // обработка выхода
    else if (data === 'exit') {
        await ctx.reply('GG!');
    }
});

// обработка входящего текста (числа от 0 до 10)
bot.on('message:text', async (ctx) => {
    const userInput = ctx.message.text.trim();

    const userGuess = parseInt(userInput);

    if (isNaN(userGuess) || userGuess < 0 || userGuess > 10) {
        await ctx.reply('Введите число от 0 до 10 включительно.');
    } else {
        const result = Math.floor(Math.random() * 11);

        // проверка, угадал ли пользователь число
        if (userGuess === result) {
            await ctx.reply(`<b><i>Вы угадали, бот выбрал ${result}.</i></b>`, { parse_mode: 'HTML' });
        } else {
            await ctx.reply(`<b><i>Вы проиграли, бот выбрал ${result}.</i></b>`, { parse_mode: 'HTML' });
        }

        const replayKeyboard = new InlineKeyboard()
            .text('Играть снова', 'play')
            .text('Выйти', 'exit');

        await ctx.reply('<i>Хотите сыграть снова?</i>', { reply_markup: replayKeyboard, parse_mode: 'HTML' });
    }
});

bot.start();
console.log('Бот запущен...');
