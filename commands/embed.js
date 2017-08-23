const Discord = require("discord.js");
exports.run = (client, msg, args) => {
  var embedBuild;
  
  try {
    embedBuild = JSON.parse(args.join(" "));
  }catch(error) {
    return msg.channel.send("``" + error.message + "``");
  }
  msg.channel.send({embed:embedBuild});
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [">"]
};

exports.help = {
  name: "embed",
  description: "Embeds some text.",
  usage: "> (description) OR > -title blah -description blah blah -color 111111 -footer blah"
};
