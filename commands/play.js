const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const queue = new Map()
module.exports = {
  name: 'play',
  description: 'Search music and play from youtube',
  aliases: ['loop','volume','pause','resume','video'],
  async execute(message,query, name) {
    switch(name){
      case 'play':
        if (!message.member.voice.channel) return  message.channel.send('U should be in channel !') 
        if (query.length <= 0) return  message.channel.send('U should make a query !') 
    
        var r = await ytSearch( query.join(' ') )
        var connection =  await message.member.voice.channel.join()
        var sound = r.all[0]
        var dispatcher = connection.play(ytdl(sound.url, { filter: 'audioonly' },{ type: 'FFmpeg' }))
        dispatcher.on('start', () => {
            message.reply(`${sound.title} is now playing !`)
        })
        queue.set('dispatcher',dispatcher)
        queue.set('sound',sound)
        dispatcher.on('error', console.error);
        break
      case 'volume':
        queue.get('dispatcher').setVolume(Number(query[0] / 100 * 2))
      break
      case 'loop':
        var connection =  await message.member.voice.channel.join()
        function looping () {
          queue.get('dispatcher').on('finish', () => {
            var dispatcher = connection.play(ytdl(queue.get('sound').url, { filter: 'audioonly' },{ type: 'FFmpeg' }))
            queue.set('dispatcher',dispatcher)
            looping()
          })
        }
        looping()
        break
      case 'pause':
        queue.get('dispatcher').pause(true)
        break
      case 'resume':
        queue.get('dispatcher').resume()
        break
      case 'video':
        message.channel.send(queue.get('sound').url)
        break
    } 
  }
}

