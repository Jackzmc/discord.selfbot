
var reactions = { a:"🇦", b:"🇧", c:"🇨", d:"🇩", e:"🇪", f:"🇫", g:"🇬", h:"🇭", i:"🇮", j:"🇯", k:"🇰", l:"🇱", m:"🇲", n:"🇳", o:"🇴", p:"🇵", q:"🇶", r:"🇷", s:"🇸", t:"🇹", u:"🇺", v:"🇻", w:"🇼", x:"🇽", y:"🇾", z:"🇿", 0:"0⃣", 1:"1⃣", 2:"2⃣", 3:"3⃣", 4:"4⃣", 5:"5⃣", 6:"6⃣", 7:"7⃣", 8:"8⃣", 9:"9⃣","!":"❕","?":"❔"};
const async = require('async');

exports.run = (client, msg, args) => {
	msg.delete();
	var reactionQuery = args.join(" ").toLowerCase().split("");
	for(var i=0;i<reactionQuery.length;i++) {
		var response = reactions[reactionQuery[i]] || undefined;
		if(response) {
			reactionQuery[i] = response;
		}
	}
	msg.channel.send(reactionQuery.join(" "));
	
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emoji']
};

exports.help = {
  name: 'emote',
  description: 'emote',
  usage: 'emote <message>'
};