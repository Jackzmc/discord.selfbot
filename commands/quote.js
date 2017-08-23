exports.run = async (client, msg, args) => {
  if(!args[0] && !msg.flags.length) msg.flags.push("list");
  
  if(!msg.flags.length) {
    const [name, ...message] = args;
    if(!client.quotes.has(name)) return client.answer(msg, `The quote \`${name}\` does not exist. Use \`${client.config.prefix}quote -help\` for help.`, {deleteAfter:true});
    const quote = client.quotes.get(name);
    msg.channel.send(message.join(" "), {embed: quote.embed});
    return msg.delete();
  }
  
  const [name, ...extra] = args;
  let data = null;
  
  switch(msg.flags[0]) {
		  
    case ("add") :
      try{
        const channel =( extra[0] && extra[0]) == "here" ? msg.channel : client.channels.get(extra[0]);
        if(!channel) return client.answer(msg, `Channel ID (argument 2) does not exist or was not provided.`, {deleteAfter:true});
        
        let message = extra[1] === "last" ? msg.channel.messages.last(2)[0] : await channel.fetchMessage(extra[1]);
        if(!message.id) return client.answer(msg, `Message ID (argument 3) doesn't seem to exist or was not provided.`, {deleteAfter:true});
        
        const embed = {
          color: 3447003,
          author: {
            name: `${message.author.username} (${message.author.id})`,
            icon_url: message.author.avatarURL()
          },
          description: message.content,
          timestamp: message.createdAt,
          footer: {
            text: `In ${channel.guild.name} : #${channel.name}`,
          },
        };
        data = {channel:channel.id, message: message.id, author: message.author.id, embed};
      } catch(e) {client.answer(msg, `Error: ${e}`, {deleteAfter: true})}
      break;
    default :
      data = extra.join(" ");
  }
  
  try {
    const response = await this.db[msg.flags[0]](name, data);
    const deleteAfter = msg.flags[0] == "list" ? false : true;
    client.answer(msg, response, {deleteAfter});
  } catch (e) {
    if(e.constructor.name === "TypeError") e = e.message;
    client.answer(msg, e, {deleteAfter: false, delay: 5000});
  }
};

exports.init = client => {
  this.db = new client.db(client, "quotes");
  this.db.extendedHelp = this.help.extended;
  client.quotes = this.db;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'quote',
  description: 'Saves or recalls a quote from someone (this requires extended help, see wiki)',
  usage: 'quote [options]',
  extended: `\`\`\`xl
-add QuoteName ChannelID||here MessageID||last
-del QuoteName
-list
\`\`\``
};