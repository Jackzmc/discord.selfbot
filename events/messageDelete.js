const blacklisted = {
    channels:["347860320485769227","232675606624468994"],
    guilds:[],
    users:[]
}

module.exports = async (client, message) => {
    if(message.channel.type === "text" && blacklisted.channels.indexOf(message.channel.id) >= 0) return; //Blacklisted channel: ignore
    if(message.guild.available  && blacklisted.guilds.indexOf(message.guild.id) >= 0) return;
    if(blacklisted.users.indexOf(message.author.id) >= 0) return;

    if(message.author.bot) return;
    if(!/^[a-z0-9-]+$/i.test(message.content.charAt(0))) return;
    const chan = !!message.guild ? `\x1b[36m${message.guild.name}\x1b[0m in \x1b[36m#${message.channel.name}` : ""; //eslint-disable-line
    console.log(`[Message Deleted] ${chan}\x1b[0m from \x1b[36m${message.author.tag}\x1b[0m\n${message.cleanContent}\x1b[0m`);
}