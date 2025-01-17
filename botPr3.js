const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7705697814:AAHn-EmR0g2rdbUPP0Mq0lr1urHnLYOy5pQ');

// команда /start
bot.command('start', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Играть', 'play') 
        .row()
        .text('Помощь', 'help'); 

    ctx.reply('Привет, это бот по игре в Орел или Решка. \nЧтобы начать игру нажмите кнопку "Играть". \nПосле этого бот подбросит монету, а вы должны угадать что выпало: Орел или Решка.', { reply_markup: keyboard });
});

// команда /help
bot.command('help', (ctx) => {
    ctx.reply('Чтобы начать игру, используйте команду /start. Выберите "Играть", после чего выберите Орел или Решка. Бот подбросит монету и сообщит результат.');
});

// обработка нажатий кнопок
bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data === 'play') {
        const keyboard = new InlineKeyboard()
            .text('Орел', 'orel')  
            .text('Решка', 'reshka'); 
        await ctx.reply('Выберите Орел или Решка:', { reply_markup: keyboard });
    }
    // обработка помощи
    else if (data === 'help') {
        await ctx.answerCallbackQuery();
        await ctx.reply('Чтобы начать игру, используйте команду /start. Выберите "Играть", затем выберите Орел или Решка.');
    }
    // обработка выбора пользователя
    else if (data === 'orel' || data === 'reshka') {
        const chose = ['Орел', 'Решка'];
        const result = chose[Math.floor(Math.random() * chose.length)];

        if (result === (data === 'orel' ? 'Орел' : 'Решка')) {
            await ctx.reply(`Вы выбрали ${data}. Вы выиграли!`);
        } else {
            await ctx.reply(`Вы выбрали ${data}. Вы проиграли. Правильный ответ: ${result}`);
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
