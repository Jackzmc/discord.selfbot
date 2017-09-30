const Bitly = require('bitly');
const config = require('../config');
let bitly = new Bitly(config.apis.bitly);
exports.run = async (client,msg,args) => {
    let query = `https://lmgtfy.com/?q=${encodeURIComponent(args.join(" "))}`;
    if(msg.flags && msg.flags[0] === "internet" || msg.flags[0] === "i") {
        query = `https://lmgtfy.com/?iie=1&q=${encodeURIComponent(args.join(" "))}`;
    }
    const response = await bitly.shorten(query).catch(err => msg.edit(`Error occurred! ${err.message}`))
    msg.edit(`${response.data.url}`)
};

exports.conf = {
	enabled: true,
    guildOnly: false,
    aliases: ["howgoogle","2google","googlehow"]
};

exports.help = {
	name: 'lmgtfy',
	description: 'let me google that for you',
	usage:'lmgtfy <link>'
};
