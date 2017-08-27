const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
	msg.edit("Uploading...");
	snekfetch.get('http://dog.ceo/api/breeds/image/random')
	.then(r => snekfetch.get(r.body.message).then(r=> {
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
  name: 'dog',
  description: 'get a dog picture',
  usage: 'dog'
};