const moment = require('moment');
require('moment-timezone');

exports.run = async (client, msg, args) => {
	if(args[0].toLowerCase() === "pst") {
        return msg.channel.send(`America/Los_Angeles: \`${moment.tz('America/Los_Angeles').format("YYYY-MM-DD h:mm A")}\``)
    }else if(args[0].toLowerCase() === "cst") {
        return msg.channel.send(`America/Los_Angeles: \`${moment.tz('America/Los_Angeles').format("YYYY-MM-DD h:mm A")}\``)
    }else if(args[0].toLowerCase() === "mst") {
        return msg.channel.send(`America/Los_Angeles: \`${moment.tz('America/Los_Angeles').format("YYYY-MM-DD h:mm A")}\``)
    }else if(args[0].toLowerCase() === "est") {
        return msg.channel.send(`America/New_York: \`${moment.tz('America/New_York').format("YYYY-MM-DD h:mm A")}\``)
    }else {
        msg.channel.send(`That's not a timezone`)
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['date'],
  permLevel: 0
};

exports.help = {
  name: 'time',
  description: 'Gets the time(zone) and date',
  usage: 'time <timezone>'
};