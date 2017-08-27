const Discord = require("discord.js");
const notifier = require('node-notifier');
const config = require('../config.json');
exports.run = async (client, msg, args) => {
  
  msg.delete();
  const code = args.join(" ");
  try {
      var evaled= await eval(code);
      var type = typeof(evaled);
      evaled = client.clean(evaled);
      if(msg.flags[0] !== "no-output" && msg.flags[0] !== "n") { //no output
        msg.channel.send(`📥 INPUT\`\`\`${code}\`\`\`📤 OUTPUT <${type}>\`\`\`xl\n${evaled}\n\`\`\``);
      }
  }
  catch(err) {
    msg.channel.send(`📥 INPUT\`\`\`${code}\`\`\`📤 OUTPUT\`\`\`xl\n${client.clean(err)}\n\`\`\``);
    //msg.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'eval',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [...code]'
};
