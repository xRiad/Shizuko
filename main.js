const fs = require('fs');

const express = require('express')

const PORT = process.env.PORT || 5000

express().listen(PORT, () => console.log(`Listening on ${ PORT }`))

const Discord = require('discord.js')

const client = new Discord.Client()

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const prefix = '/'

client.once('ready', () => {
    console.log('Shizuko is here !')
})

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command)
}

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).split(/ +/)
    
    const commandName = args.shift().toLocaleLowerCase()
    // if ( !client.commands.has(commandName)) return
	try {
		var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		if (command) command.execute(message,args, commandName)
		

	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

})

client.login('ODU4MzE4ODc4MjcwNTU0MTMz.YNcZvw.wQfYZaFRergJh6Ewda6JBTt_Sm4')