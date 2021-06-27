module.exports = {
    name: 'leave',
    description: 'Search music and play from youtube',
    async execute(message, args) {
      const voiceChannel = message.member.voice.channel

      if (!voiceChannel) return message.channel.send('U should be in voice channel !')
      voiceChannel.leave()
    }
}