
exports.run = (client, msg, args) => {
	msg.delete();
	var quoteArgs = args.join(" ");
	var quotedMember;
	var userList = client.users.array();
	var color;
	for(var i=0;i<userList.length;i++) {
		if(msg.mentions.users.has(userList[i].id)) {
			quotedMember = userList[i];
		}
	}
	
	if(msg.channel.type !== "text") { //IS DM
		//color = 6488626;
		color = ((Math.floor(Math.random() * 256))  << 16) + ((Math.floor(Math.random() * 256)) << 8) + ((Math.floor(Math.random() * 256)));
		quoteArgs = quoteArgs.replace(quotedMember,"");
	}else{ //IS NOT DM
		if(quotedMember) {
			color = msg.guild.members.get(quotedMember.id).displayColor;	
			quoteArgs = quoteArgs.replace(msg.guild.members.get(quotedMember.id).toString(),"");
		}
		if(!quotedMember) color = msg.guild.me.displayColor;		
		
	}
	if(!quotedMember) quotedMember = client.user;
	
	return msg.channel.send({embed: {
		author: {
           name: `${quotedMember.username}#${quotedMember.discriminator} `,
           icon_url:`${quotedMember.avatarURL()}`
        },
		color:color,
		description: quoteArgs,
		footer:{
			text:`ID: ${quotedMember.id}`
		}
	}}).catch(error => {
		msg.channel.send("Error! ``" + error.message + "``");
	});
							  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fquote']
};

exports.help = {
  name: 'fakequote',
  description: 'generates a quoke',
  usage: 'fakequote <text> | [user]'
};