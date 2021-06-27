module.exports = {
    name: 'help',
    description: 'Showing commands',
    async execute(message, args) {
      message.reply(`
        Поддерживаемые комманды:

        **/hi** - Приветствие

        **/play** <название> - Начать проигрывание аудио ( надо быть поключенным к каналу )

        **/leave** - Покинуть канал ( остановить проигрывание )
      `)
    }
}