exports.run = (client, msg, args) => {
  if(!parseInt(args[0], 10)) {
    return msg.edit(`Please provide a number of messages to clean reactions from!`).then(setTimeout(msg.delete.bind(msg), 1000));
  }
  if(!msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return msg.edit(`Oh hey idiot, how about doing this only if you have permissions to do so, eh?`).then(setTimeout(msg.delete.bind(msg), 1000));
  }
  msg.channel.fetchMessages({limit: parseInt(args[0], 10)}).then(msglog => {
    msg.edit(`Clearing Reactions from this channel for ${args[0]} messages...`).then(setTimeout(msg.delete.bind(msg), 2000));
    msglog.forEach(message => {
      message.clearReactions();
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'cr',
  description: 'Clears all reactions from given number of messages.',
  usage: 'cr [message count]'
};