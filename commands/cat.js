const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  msg.edit("Uploading...");
	snekfetch.get('http://random.cat/meow')
  .then(r => snekfetch.get(r.body.file).then(r=> {
    msg.channel.send("", {files:[{attachment: r.body}]});
    msg.delete();
  }));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'cat',
  description: 'get a cat picture',
  usage: 'cat'
};