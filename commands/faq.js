const nullify = require('./nullify.js').faqList;

exports.run = async (client, msg, args) => {
	msg.delete();
	if(args[0] === "list") {
		let faqs = "";
		for(var i=0;i<nullify.length;i++) {
			if(i==0) {
				faqs = `(${i+1})${nullify[i].name}`;
				continue;
			}
			faqs += `, (${i+1})${nullify[i].name}`;
		}
		return msg.channel.send(`There are ${nullify.length} faq's:\n${faqs}`);
	}
	var faqID = parseInt(args[0]) - 1;
	if(!isNaN(faqID)){
		if(nullify[faqID]) {
			var faq = nullify[faqID];
			return msg.channel.send({embed: {
				title:faq.title,
				description:faq.description,
				footer:{text:faq.footer},
				fields:faq.fields,
				image:{url:faq.image}
			}});
		}
		return msg.channel.send("Unknown FAQ ID");
	}
	return msg.channel.send("Unknown FAQ id")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'faq',
  description: 'for nullify menu',
  usage: 'faq <number>'
};
