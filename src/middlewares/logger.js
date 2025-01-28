const logger = (ctx, next) => {
    if (ctx.message) {
        console.log(`Received message: ${ctx.message.text}`);
    } else if (ctx.callbackQuery) {
        console.log(`Received callback: ${ctx.callbackQuery.data}`);
    }

    // Передаем дальше
    return next();
};

module.exports = logger;
