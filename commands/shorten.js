const Bitly = require('bitly');
const config = require('../config');
let bitly = new Bitly(config.apis.bitly);
//could use get-urls
exports.run = async (client,msg,args) => {
    let query = args.join(" ");
    const response = await bitly.shorten(query).catch(err => msg.edit(`Error occurred! ${err.message}`))
    msg.edit(`✅ ${response.data.url}`)
};

exports.conf = {
	enabled: true,
    guildOnly: false,
    aliases: ["bitly"]
};

exports.help = {
	name: 'shorten',
	description: 'Link shortener',
	usage:'shorten <link>'
};
