const Discord = require("discord.js");
const notifier = require('node-notifier');
const config = require('../config.json');
const moment = require('moment');
const util = require('util');
const present = require('present');

const users = {
  josh:{gay:true},
  ezra:{gay:true},
  robin:{gay:true},
  caeden:{gay:false},
  jackz:{gay:false},
  minish:{gay:false}
}
exports.run = async (client, msg, args) => {
  
  msg.delete();
  const code = args.join(" ");
  
  if(!code) return msg.channel.send("No code to run");
  try {
      const measure_start = present();
      var evaled = await eval(code);
      const measure_stop = present();
      const time_taken = (measure_stop - measure_start).toFixed(4);

      var type = typeof(evaled);
      evaled = client.clean(evaled);
      if(msg.flags[0] === "no-output" || msg.flags[0] === "n") { //no output
        msg.channel.send(`📥 INPUT\`\`\`js\n${code}\`\`\``);
      }else if(msg.flags[0] === "no-embed" || msg.flags[0] === "e") {
        msg.channel.send(evaled,{embed:{
          description:`📥 INPUT\`\`\`js\n${code}\`\`\`📤 OUTPUT <${type}>`,
          footer:{text:`Took ${time_taken}ms`}
        }});
      }else if(msg.flags[0] === "output-only" || msg.flags[0] === "i") {
          msg.channel.send(evaled);
      }else{
        msg.channel.send({embed:{
          description:`📥 INPUT\`\`\`js\n${code}\`\`\`📤 OUTPUT <${type}>\`\`\`js\n${evaled}\n\`\`\``,
          footer:{text:`Took ${time_taken}ms`}
        }});
      }
  }catch(err) {
    if(msg.flags[0] === "stracktrace" || msg.flags[0] === "s") {
      console.log(`Eval Error In #${msg.channel.name}:\n${err.stack}`)
      msg.channel.send({embed:{
        description:`📥 INPUT\`\`\`js\n${code}\`\`\`📤 OUTPUT\`\`\`js\n${client.clean(err.message)}\n\`\`\``,
        footer:{text:`Check console for stacktrace`}
      }});

    }else{
      msg.channel.send({embed:{
        description:`📥 INPUT\`\`\`js\n${code}\`\`\`📤 OUTPUT\`\`\`js\n${client.clean(err.message)}\n\`\`\``,
        footer:{text:(err.constructor) ? err.constructor.name : 'Unknown type of error'}
      }});
    }
    
    //msg.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'eval',
  description: 'Evaluates arbitrary javascript.',
  usage: 'eval [...code]'
};
