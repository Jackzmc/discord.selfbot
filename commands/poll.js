const letters = ["🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"]
const asyncjs = require('async');

exports.run = (client,msg,args) => {
    msg.delete();
    const choices = args.join(" ").split("|");
    const pollName = choices[0];
    choices.shift();
    if(choices.length <= 1) return msg.channel.send({embed:{title:`${this.help.name}`,description:`${this.help.description}\n\n**Usage:** \`\`${this.help.usage}\`\``}})
    var options = "";
    for(var i=0;i<choices.length;i++) {
        if(i>5) break; //Only max of 6 
        options += `\n${letters[i]} - ${choices[i].trim().substring(0,40)}`
    }
	msg.channel.send({embed: {
        color:(msg.member) ? msg.member.displayColor : null,
        title:pollName.trim(),
        description:options
    }}).then(m => {
        //react
        asyncjs.eachOfSeries(choices,(result,i,callback) => {
            m.react(letters[i]).then(() => callback()); 
        }, (err) => {
            if(err) console.warn(`[Poll] ${err}`);
        });

        return;
    }).catch(err => {
        msg.reply("there was an error! Check console");
        console.error(err.message);
    });
};

exports.conf = {
	enabled: true,
    guildOnly: false,
    aliases: ["polls"]
};

exports.help = {
	name: 'poll',
	description: 'Makes a poll of choices, up to 6 choices.',
	usage:'poll Name of poll | Choice A | Choice B'
};
