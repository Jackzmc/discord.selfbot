const JsonDB = require('node-json-db');
const todoDB = new JsonDB("data/todos.json", true, true);

exports.run = (client, msg, args) => {
    msg.delete();
	msg.channel.send("//TODO do todo.js");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'todo',
  description: 'Todo list',
  usage: 'todo <add/view/del/check/uncheck> <id/text>'
};

