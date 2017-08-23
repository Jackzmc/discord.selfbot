const Discord = require("discord.js");
const os = require('os');
const moment = require("moment");
require("moment-duration-format");

exports.run = (client,msg,args) => {
	var botName = msg.guild.members.get(client.user.id).nickname;
	moment.locale();
	const uptime = moment.duration(client.uptime).format('d[ days], h[ hours], m[ minutes, and ]s[ seconds]');
	const since = moment().format("MMM Do[,] Y [@] h:mm A [UTC]Z")

	if(!botName) botName = client.user.username;
	msg.channel.send({embed:{
		color:msg.guild.me.displayColor,
		fields:[
			{
				name:"❯ Uptime",
				value:`**For** ${uptime}\n**Since** ${since}`,
			},
			{
				name:"❯ Usage Info",
				value:`CPU one day...%\n` + `RAM ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB \n` + `OS ${os.platform().replace("win32","Windows").replace("linux","Linux")}`,
				inline:true
			},
			{
				name:"❯ Bot Info",
				value:`Guilds: ${client.guilds.size.toLocaleString()}\n` 
				+ `Channels: ${client.channels.size.toLocaleString()}\n`
				+ `Users: ${client.users.size.toLocaleString()}`,
				inline:true
			},
			{
				name:"❯ Miscellaneous",
				value:`PING ${client.ping.toFixed(2)}ms\n`
				+ `NODE ${process.version}\n`
				+ `DISCORD.JS v${Discord.version}`
			}
		],
		footer:{
			text:`${client.user.username}'s selfbot (using evie.selfbot c)`
		}

	}});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Gives some useful bot statistics',
  usage: 'stats'
};