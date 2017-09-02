
var reactions = { a:"🇦", b:"🇧", c:"🇨", d:"🇩", e:"🇪", f:"🇫", g:"🇬", h:"🇭", i:"🇮", j:"🇯", k:"🇰", l:"🇱", m:"🇲", n:"🇳", o:"🇴", p:"🇵", q:"🇶", r:"🇷", s:"🇸", t:"🇹", u:"🇺", v:"🇻", w:"🇼", x:"🇽", y:"🇾", z:"🇿", 0:"0⃣", 1:"1⃣", 2:"2⃣", 3:"3⃣", 4:"4⃣", 5:"5⃣", 6:"6⃣", 7:"7⃣", 8:"8⃣", 9:"9⃣","!":"❕","?":"❔"};
const async = require('async');

exports.run = (client, msg, args) => {
    msg.delete();
    if(msg.channel.type === "text") {
        const member = msg.mentions.members.array()[0]
        if(!member) return msg.channel.send("Couldn't find that user")
        const nickname = (member.nickname) ? member.nickname : member.user.username;
        return msg.channel.send({embed:{title:`Avatar for ${nickname}`,color:member.displayColor,image:{url:member.user.displayAvatarURL({options:{size:2048}})}}});
    }else{
        const user = msg.mentions.users.array()[0];
        if(!user) return msg.channel.send("Could not find any user");
        return msg.channel.send({embed:{title:`Avatar for ${user.username}`,image:{url:user.displayAvatarURL({options:{size:2048}})}}});
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'avatar',
  description: 'avatar ',
  usage: 'avatar <user>'
};