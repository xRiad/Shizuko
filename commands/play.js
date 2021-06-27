const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')

module.exports = {
    name: 'play',
    description: 'Search music and play from youtube',
    async execute(message, args) {
        if (!message.member.voice.channel) return  message.channel.send('U should be in channel !') 
        args.shift()
        var query = args
        if (query.length <= 0) return  message.channel.send('U should make a query !') 
        console.log(args)
        
        console.log(query.join(' '))
        var r = await ytSearch( query.join(' ') )
        
        const connection =  await message.member.voice.channel.join()
        var random = r.all[Math.floor(Math.random() * r.all.length)]
        console.log(random)
        const dispatcher = connection.play(ytdl(random.url, { filter: 'audioonly' },{ type: 'FFmpeg' }))

        dispatcher.on('start', () => {
            console.log(`${random.title} is now playing!`)
            message.reply(`${random.title} is now playing !`)
        })
        
        dispatcher.on('error', console.error);
    }
}