const { Bot, InlineKeyboard } = require('grammy');

const bot = new Bot('7705697814:AAHn-EmR0g2rdbUPP0Mq0lr1urHnLYOy5pQ');

//команда /start

bot.command('start', (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Опция 1', 'option1')
        .text('Опция 2', 'option2')
        .row()
        .text('Помощь', 'help')

    ctx.reply('Выберите одну из опций:', { reply_markup: keyboard});
});


//Обработка нажатий кнопок
bot.on('callback_query:data', (ctx) => {
    const data = ctx.callbackQuery.data;

    if(data === 'option1'){
        ctx.answerCallbackQuery('Вы выбрали Опцию 1!');
        ctx.reply('Это содержание опции 1');
    } else if(data === 'option2'){
        ctx.answerCallbackQuery('Вы выбрали Опцию 2!');
        ctx.reply('Это содержание опции 2')
    } else if(data === 'help'){
        ctx.answerCallbackQuery('Выберите опцию для получения информации');
        ctx.reply('Для получения информации выберите любую из опций.');
    }
})

bot.start();
console.log('Бот запущен....')