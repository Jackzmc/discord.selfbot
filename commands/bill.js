const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
	snekfetch.get('http://belikebill.azurewebsites.net/billgen-API.php?default=1')
   .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
    msg.delete();
							  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'bill',
  description: 'Be like bill',
  usage: 'bill '
};