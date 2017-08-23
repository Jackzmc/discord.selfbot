/*global wait*/
const warned = [];
const notifier = require('node-notifier');
const path = require('path');

module.exports = async (client, message) => {
  if(message.mentions.users.has(client.user.id) || message.mentions.everyone || (message.guild && message.mentions.roles.filter(r=>message.guild.member(client.user.id).roles.has(r.id)).size > 0)) {
    const chan = !!message.guild ? `${message.guild.name} #${message.channel.name}` : "";
    client.log("mention", chan, message.author, message.cleanContent);
	notifier.notify({
	  title: `Mention in ${chan}`,
	  subtitle: `By ${message.author}`,
	  icon:'D:\Jackz\Pictures\Misc\Discord-Logo-Color.png',
	  message: message.cleanContent,
	  wait: false, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds 
	}, (error, response, metadata) => {
	  if(error) console.error(error);
	});
  }

  if(message.author.id !== client.user.id) return;
  if(message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.split(/ +/g);
  const command = args.shift().slice(client.config.prefix.length).toLowerCase();

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (cmd) {
    message.flags = [];
    while(args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    cmd.run(client, message, args);
  } else if(client.tags.has(command)) {
    message.edit(`${args.join(" ")} ${client.tags.get(command).contents}`);
  }
};
