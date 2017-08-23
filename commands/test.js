exports.run = async (client, msg, args) => {
	msg.delete();
  	msg.channel.send(msg.guild.me.displayColor);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'test',
  description: 'Dumping grounds for any test I make.',
  usage: 'test'
};
