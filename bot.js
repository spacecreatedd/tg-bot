const { Bot } = require('grammy');

const bot = new Bot('7705697814:AAHn-EmR0g2rdbUPP0Mq0lr1urHnLYOy5pQ')

bot.command('start', (ctx) => {
    ctx.reply('Привет! Я просто ботяра. Напиши /help, чтобы узнать, что я умею!');
});

bot.command('help', (ctx) => {
    ctx.reply('/start - приветствие\n /help - помощь\n /echo - повторить сообщение\n /joke - расскажи шутку');
});

bot.command('echo', (ctx) => {
    const message = ctx.message.text.split(' ').slice(1).join(' ');
    ctx.reply(message || 'Пожалуйста, введите сообщение для повторения.');
});

bot.command('joke', async (ctx) => {
    const jokes = [
        '- Вчера долго пыталась объяснить бабуле, что работаю программистом. \n- Удалось? \n- Короче, сошлись на том, что чиню телевизоры и развожу мышей.',
        '- Почему ваши дети всё время ссорятся? \n- Конфликт версий',
        'Программисту нужно попасть на 12 этаж. Он заходит в лифт, нажимает кнопку "1", затем "2" и долго еще безуспешно ищет глазами клавишу Enter...'
    ];

    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    await ctx.reply(randomJoke);
});

bot.start();
console.log('Бот запущен...')