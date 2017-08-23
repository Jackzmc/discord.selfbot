exports.run = async (client, msg, args) => {
	msg.edit(`➡ ${args.join(' ')}`);
  var answers = [ "As I see it, yes", "It is certain", "It is decidedly so", "Most likely", "Outlook good", "Signs point to yes", "Without a doubt", "Yes", "Yes - definitely", "You may rely on it", "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
	msg.channel.send(`🎱 ${answers[Math.floor(Math.random()*answers.length)]}`);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: '8ball',
  description: 'the ball of eight',
  usage: '8ball <question>'
};
