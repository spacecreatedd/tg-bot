const escapeMarkdown = (text) => {
    return text
        .replace(/[.*+\-?^=!:${}()|\[\]\/\\]/g, '\\$&') // Экранирование специальных символов
        .replace(/_/g, '\\_') // Экранирование нижнего подчеркивания
        .replace(/\*/g, '\\*') // Экранирование звездочек
        .replace(/`/g, '\\`') // Экранирование обратных кавычек
        .replace(/~/g, '\\~'); // Экранирование тильды
};

module.exports = escapeMarkdown;
