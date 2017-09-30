const Discord = require("discord.js");
const os = require('os');
const moment = require("moment");
require("moment-duration-format");

exports.run = (client,msg,args) => {
	return msg.edit(`👏${args.join("👏")}👏`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'clap',
  description: 'Claps',
  usage: 'clap <message>'
};