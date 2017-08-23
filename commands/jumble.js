function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

exports.run = async (client, msg, args) => {
	shuffle(args);
	msg.channel.send(args.join(" "));
	msg.delete();
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'jumble',
  description: 'words it around move',
  usage: 'jumble <words>'
};
