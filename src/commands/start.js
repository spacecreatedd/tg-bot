const { InlineKeyboard } = require('grammy');

const startCommand = (ctx) => {
    const keyboard = new InlineKeyboard()
        .text('Играть', 'play')
        .row()
        .text('Помощь', 'help');

    ctx.reply('Привет, это бот по игре "Угадай число". Напиши /help для получения инструкций.', { reply_markup: keyboard });
};

module.exports = startCommand;
