module.exports = {
    name: 'hi',
    description: 'Make a hello message but in japanese',
    execute(message, args) {
        message.channel.send('Kon\'nichiwa')
    }
}