const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7705697814:AAHn-EmR0g2rdbUPP0Mq0lr1urHnLYOy5pQ');

// команда /start
bot.command('start', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Играть', 'play') 
        .row()
        .text('Помощь', 'help'); 

    ctx.reply('Привет, это бот по игре в Угадай число', { reply_markup: keyboard });
});

// команда /help
bot.command('help', (ctx) => {
    ctx.reply('Чтобы начать игру, используйте команду /start');
});

// обработка нажатий кнопок
bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data === 'play') {
        const keyboard = new InlineKeyboard()
            .text('Камень', 'stone')  
            .text('Ножницы', 'scissors')
            .text('Бумага', 'paper'); // исправлено "papper" на "paper"
        await ctx.reply('Выберите Камень, Ножницы или Бумагу:', { reply_markup: keyboard });
    }
    // обработка помощи
    else if (data === 'help') {
        await ctx.answerCallbackQuery();
        await ctx.reply('Чтобы начать игру, используйте команду /start. Выберите "Играть", затем выберите Камень, Ножницы или Бумагу.');
    }
    // обработка выбора пользователя
    else if (data === 'stone' || data === 'scissors' || data === 'paper') {
        const chose = ['Камень', 'Ножницы', 'Бумага'];
        const result = chose[Math.floor(Math.random() * chose.length)];

        // обработка выигрыша, ничьи и проигрыша
        if (result === 'Камень' && data === 'stone' ||
            result === 'Ножницы' && data === 'scissors' ||
            result === 'Бумага' && data === 'paper') {
            await ctx.reply(`Ничья! Оба выбрали ${result}`);
        } else if (
            (result === 'Камень' && data === 'scissors') ||
            (result === 'Ножницы' && data === 'paper') ||
            (result === 'Бумага' && data === 'stone')) {
            await ctx.reply(`Вы проиграли, бот выбрал ${result}`);
        } else {
            await ctx.reply(`Вы выиграли, бот выбрал ${result}`);
        }

        const replayKeyboard = new InlineKeyboard()
            .text('Играть снова', 'play')
            .text('Выйти', 'exit');

        await ctx.reply('Хотите сыграть еще раз?', { reply_markup: replayKeyboard });
    }
    else if (data === 'exit') {
        await ctx.reply('GG!');
    }
});

bot.start();
console.log('Бот запущен...');
