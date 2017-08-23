
var reactions = { a:"🇦", b:"🇧", c:"🇨", d:"🇩", e:"🇪", f:"🇫", g:"🇬", h:"🇭", i:"🇮", j:"🇯", k:"🇰", l:"🇱", m:"🇲", n:"🇳", o:"🇴", p:"🇵", q:"🇶", r:"🇷", s:"🇸", t:"🇹", u:"🇺", v:"🇻", w:"🇼", x:"🇽", y:"🇾", z:"🇿", 0:"0⃣", 1:"1⃣", 2:"2⃣", 3:"3⃣", 4:"4⃣", 5:"5⃣", 6:"6⃣", 7:"7⃣", 8:"8⃣", 9:"9⃣","!":"❕","?":"❔"};
const async = require('async');

exports.run = (client, msg, args) => {
	msg.delete();
	if(msg.flags[0] === "clear" || msg.flags[0] === "c" ) {
		return msg.channel.fetchMessages({
			limit: 5,
			before: msg.id
		}).then(messages => {
			var counter = 0;
			messages.forEach(message => {
				message.clearReactions().catch(err => {
					//silent capture errors
				})
				counter++;
			});
			msg.channel.send(`Cleared ${counter} reactions`).then(m => m.delete(5000));
		});
	}
	
	msg.channel.fetchMessages({
		limit: 1,
		before: msg.id
	}).then(messages => {
		var t = messages.array()[0];
		if (t) {
			var reactionQuery = args.join(" ").toLowerCase().split("");
			async.eachOfSeries(reactionQuery, (result, i, callback) => {
				if(reactions[result]) {
					try {
						t.react(reactions[result]).then(() => callback()).catch(err => callback(err));
					}catch(err) {
						callback(err);
					}
				}
			}, (err) => {
				if(err) console.warn(`[Emote] ${err}`);
			});

			return;
		}
	})
	
	
	
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reaction']
};

exports.help = {
  name: 'react',
  description: 'react',
  usage: 'react <message>'
};