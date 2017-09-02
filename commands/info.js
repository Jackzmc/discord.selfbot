/* esversion:6, node:true */

const moment = require('moment');
require('moment-duration-format');
const color = 0;

const capFirst = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const user_lookup = (user, msg) => {
	var member_info,
		user_info;
	if(msg.guild.members.has(user.id)) {
		var minfo = msg.guild.members.get(user.id);
		member_info = `**Nickname:** ${((minfo.nickname) ? minfo.nickname : '*none*')}\n`
		+ `**Joined:** ${moment(minfo.joinedAt).format('MMMM Do YYYY, h:mm a')}\n`
		+ `**Roles: ** ${minfo.roles.array().join(', ')}`;
	}else{
		member_info = `${user.username} is not in this guild`;
	}
	user_info = `**Created:** ${moment(user.createdAt).format('MMMM Do YYYY, h:mm a')}\n`
	+ `**Presence:** ${capFirst(user.presence.status)}` + ((user.presence.game) ? `, Playing \`\`${user.presence.game.name}\`\`` : '');


	return msg.channel.send({embed: {
		title:`${user.tag}'s stats ` + ((user.bot) ? '[BOT]':''),
		description:`ID: ${user.id}\n\n`,
		color:`${((minfo)? minfo.displayColor:color)}`,
		thumbnail:{url:user.avatarURL},
		fields:[
			{
				name:"❯ Member Info",
				value:`${member_info}`,
			},
			{
				name:"❯ User Info",
				value:`${user_info}`,
			}

		]
	}});
	//check if member of guild, if so stats
}
const channel_lookup = (channel,msg) => {
	var channel_info;
	if(channel.type === "text") {
		channel_info = `**Allowed Members:** ${channel.members.size}\n`
		+ `**NSFW:** ${((channel.nsfw) ? 'Yes':'No')}\n`
		+ `**Messages:** ${channel.messages.size}`
	}else if(channel.type === "voice") {
		channel_info = `**Current Members:** ${channel.members.size}/${((channel.userLimit === 0) ? 'Infinity':channel.userLimit)}\n`
	}
	return msg.channel.send({embed: {
		title:`${channel.name} (Index ${channel.position})`,
		description:`ID: ${channel.id}\n\n`,
		color:color,
		fields:[
			{
				name:"❯ General Info",
				value:`**Created:** ${moment(channel.createdAt).format('MMMM Do YYYY')}\n`
			},
			{
				name:`❯ ${((channel.type === 'text') ? 'Text Channel ':'Voice')} Info`,
				value:channel_info
			}
		],

	}});
}
const guild_lookup = (guild,msg) => {
	var roleList = [];
	var roleArray = guild.roles.array();
	for(var i=0;i<roleArray.length;i++) {
		roleList.push(roleArray[i].name)
	}
	var verification = ["None","Low","Medium","(╯°□°）╯︵ ┻━┻","┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻"]
	var textchannels = 0;
	var voicechannels = 0;
	for(var i=0;i<guild.channels.array().length;i++) {
		if(guild.channels.array()[i].type === "text") {
			textchannels++;
			continue;
		}else if(guild.channels.array()[i].type === "voice") {
			voicechannels++;
			continue;
		}
	}
	return msg.channel.send({embed: {
		title:`${guild.name}`,
		description:`ID: ${guild.id}\n\n`,
		thumbnail:{url:guild.iconURL},
		color:color,
		fields:[
			{
				name:"❯ General Info",
				value:`Created: ${moment(guild.createdAt).fromNow()} on ${moment(guild.createdAt).format('MMMM Do YYYY')}\n`
				+ `Region: ${guild.region}\n`
				+ `Verification Level: ${verification[guild.verificationLevel]}\n`
				+ `Owner: ${guild.owner.user.username}#${guild.owner.user.discriminator} (${guild.ownerID})\n\n`
			},
			{
				name:"❯ Channel & Member Info",
				value:`${textchannels} are text, and ${voicechannels} voice. ${guild.channels.size} total\n`
				+ `Default: ${guild.defaultChannel} \n`
				+ `AFK Channel: ${((guild.afkChannelID) ? guild.channels.get(guild.afkChannelID).name : '*none*')}\n`
				+ `${guild.members.size} members, ${guild.emojis.size} emojis`,
				inline:true
			},
			{
				name:`❯ Roles (${guild.roles.size})`,
				value:roleList.join(', '),
				inline:true
			}

		],

	}});

	//check if member of guild, if so stats
}

const role_lookup = (role,msg) => {
	var array = role.members.array();
	var list = [];
	for(var i=0;i<array.length;i++) {
		if(i<=20) list.push(array[i].user.username);
		if(i>20) {
			list.push(`... and ${(array.length - 21)} more`);
			break;
		}
	}
	roleMembers = list.join(", ");

	return msg.channel.send({embed: {
		title:`${role.name} info (Index ${role.position})`,
		description:`ID: ${role.id}\n\n`,
		color:role.color,
		fields:[
			{
				name:"❯ General Info",
				value:`**Created:** ${moment(role.createdAt).format('MMMM Do YYYY, h:mm a')}\n`
				+ `**Hoisted:** ${((role.hoist) ? 'Yes' : 'No')}\n`
				+ `**Mentionable:** ${((role.mentionable) ? 'Yes' : 'No')}\n`
				+ `**Permissions:** ${role.permissions}`
			},
			{
				name:`❯ Members (${role.members.size})`,
				value:roleMembers
			}

		],

	}});
	//check if member of guild, if so stats
}

exports.run = (client,msg,args) => {
	var input = msg.content.toLowerCase().replace(msg.content.toLowerCase().split(" ")[0] + " " + msg.content.toLowerCase().split(" ")[1] + " ","");
	msg.delete();
	
	if(args[0] === "guild" || args[0] === "guild-info") {
		if(!args[1]) return guild_lookup(msg.guild,msg);
		var guildList = msg.guild.roles.array();
		for(var i=0;i<guildList.length;i++) {

			if(guildList[i].id === input) {
				return guild_lookup(guildList[i],msg);
			}
			if(guildList[i].name === input) {
				return guild_lookup(guildList[i],msg);
			}
		}
		return msg.reply("Couldn't find anything for ``" + input + '``');
	}else if(args[0] === "user" || args[0] === "user-info") {
		if(!args[1]) return user_lookup(msg.author,msg);
		var userList = client.users.array();
		for(var i=0;i<userList.length;i++) {
			if(userList[i].id === input) {
				return user_lookup(userList[i],msg);
			}
			if(msg.mentions.users.has(userList[i].id)) {
				return user_lookup(userList[i],msg);
			}
		}
		return msg.reply("Couldn't find anything for ``" + input + '``');
	}else if(args[0] === "role" || args[0] === "role-info") {
		if(!args[1]) return role_lookup(msg.member.highestRole,msg)
		var roleList = msg.guild.roles.array();
		for(var i=0;i<roleList.length;i++) {

			if(roleList[i].id === input) {
				return role_lookup(roleList[i],msg);
			}
			if(roleList[i].name.toLowerCase() === input) {
				return role_lookup(roleList[i],msg);
			}
		}
		return msg.reply("Couldn't find anything for ``" + input + '``');
	}else if(args[0] === "channel" || args[0] === "channel-info") {
		if(!args[1]) return channel_lookup(msg.channel,msg);
		var channelList = msg.guild.channels.array();
		for(var i=0;i<channelList.length;i++) {

			if(channelList[i].id === input) {
				return channel_lookup(channelList[i],msg);
			}
			if(channelList[i].name.toLowerCase() === input) {
				return channel_lookup(channelList[i],msg);
			}
		}
		return msg.reply("Couldn't find anything for ``" + input + '``');
	}else{
		return msg.channel.send("❌ Invalid option! Valid Options are [guild] [user] [role] [channel]")
	}
	
	return msg.reply("Couldn't find anything for ``" + input + '``');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'info',
  description: 'Gives some info',
  usage: 'info <user/channel/guild/role mention or ID>'
};