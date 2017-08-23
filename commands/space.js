exports.run = (client, msg, args) => {
	msg.delete();
    if (args.length < 1) {
        throw 'You must provide text to space out!';
    }

    let amount = 2;

    if (!isNaN(args[0])) {
        amount = parseInt(args[0]);
        (amount < 1) && (amount = 1);
        (amount > 15) && (amount = 15);
        args = args.slice(1);
    }

    msg.channel.send(args.join(' '.repeat(amount / 2)).split('').join(' '.repeat(amount)));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'space',
  description: 'spaces out text to be cool',
  usage: 'space [amount] <text> '
};