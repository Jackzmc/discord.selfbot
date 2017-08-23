const snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["Achievement Get!", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;

  if(title.length > 24 || contents.length > 24) return msg.edit("Max Length: 24 Characters. Soz.").then(msg.delete.bind(msg), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=>msg.channel.send("", {files:[{attachment: r.body}]}));
  msg.delete();

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mca","ach"]
};

exports.help = {
  name: 'achievement',
  description: 'Send a Minecraft Achievement image to the channel',
  usage: 'achievement Title|Text (/achievement Achievement Get|Used a Command!)'
};