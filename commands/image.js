String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
const JsonDB = require('node-json-db');
const imagesDB = new JsonDB("data/images.json", true, true);
var images = imagesDB.getData('/');

exports.run = (client, msg, args) => {
	msg.delete();
	if(args[0] === "reload") {
		imagesDB.reload();
		return msg.channel.send("Reloaded image DB");
	}else if(args[0] === "list") {
		return msg.channel.send("not available");
	}else if(args[0] === "add") {
		
		return msg.channel.send("not ready");
	}
	var imageQuery = args.join(" ").toLowerCase().replaceAll(' ','_');
	if(!images[imageQuery]) return msg.channel.send("Unknown image ``" + imageQuery + "``");
	return msg.channel.send({file:{attachment:`D:\\Jackz\\Pictures\\Misc\\${images[imageQuery]}`}});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['img','images']
};

exports.help = {
  name: 'image',
  description: 'get image',
  usage: 'image <name>'
};