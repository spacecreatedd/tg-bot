const bot = require('./bot');

bot.start(); 


bot.catch((err) => {
    console.error('Произошла ошибка: ', err);
    // Можно отправить сообщение в чат, чтобы пользователи знали о проблемах
});
