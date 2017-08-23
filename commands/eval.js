const Discord = require("discord.js");
const notifier = require('node-notifier');

exports.run = async (client, msg, args) => {
  msg.delete();
  const code = args.join(" ");
  try {
      const evaled = client.clean(await eval(code));
      msg.channel.send(`📥 INPUT\`\`\`${code}\`\`\`📤 OUTPUT\`\`\`xl\n${evaled}\n\`\`\``);
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
