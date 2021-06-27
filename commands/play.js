const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const queue = new Map()
module.exports = {
    name: 'play',
    description: 'Search music and play from youtube',
    aliases: ['loop','volume'],
    async execute(message,query, name) {
        const prefix = '/'
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
                queue.get('dispatcher').setVolume(Number(query[0] / 100))
                console.log(Number(query[0] / 100))
            break
            case 'loop':
                var connection =  await message.member.voice.channel.join()

                function looping () {
                    queue.get('dispatcher').on('finish', () => {
                
                        console.log('dispatcher finish was executed')
                        var dispatcher = connection.play(ytdl(queue.get('sound').url, { filter: 'audioonly' },{ type: 'FFmpeg' }))
                        queue.set('dispatcher',dispatcher)
                        console.log('audio.mp3 has finished playing!')
                        looping()
                    });
                }
                looping()
                console.log('loop cas was executed')
                
                
                // queue.get('dispatcher').on('finish', () => {
                //     console.log('dispatcher finish was executed')
                //     connection.play(ytdl(queue.get('sound').url, { filter: 'audioonly' },{ type: 'FFmpeg' }))
                //     console.log('audio.mp3 has finished playing!')
                // });
            break
        }
        
    }
}

