const globalColor = 8642457;
const {stripIndents} = require('common-tags');

exports.faqList = [
	{
		title:"1. First usage",
		name:"usage",
		description:"Open the game and go into story mode (or online), then open the .exe provided when you bought the menu.",
		fields:[
			{
				name:"2. Keybinds",
				value:"NUMLOCK Is required for most of the keyboards (if it doesn't work with numlock, try without) \nNumpad----------------------- \n:seven:/:nine: = :arrow_left:/:arrow_right: tabs \n:four:/:six: = :arrow_left:/:arrow_right: values \n:eight:/:two: = :arrow_up:/:arrow_down: \n------------------------------ \n:five: enter :zero: return\n —— show/hide :regional_indicator_f::nine: close"
			}
		],
		image: "https://cdn.discordapp.com/attachments/332200393406939139/332217936343203841/null.png",
	},
	{
		title:"2. Keybinds",
		name:"keybinds",
		description:"NUMLOCK Is required for most of the keyboards (if it doesn't work with numlock, try without) \nNumpad----------------------- \n:seven:/:nine: = :arrow_left:/:arrow_right: tabs \n:four:/:six: = :arrow_left:/:arrow_right: values \n:eight:/:two: = :arrow_up:/:arrow_down: \n------------------------------ \n:five: enter :zero: return\n —— show/hide :regional_indicator_f::nine: close",
		image: "https://cdn.discordapp.com/attachments/332200393406939139/332217936343203841/null.png",
	},
	{
		title:"3. Autoupdates",
		name:"autoupdates",
		description:"The menu is auto-updating itself, you don't have to download anything else than the .exe we gave you when you bought the menu. If you are having trouble with the menu, try downloading the launcher again"
	},
	{
		title:"4. What do I do after purchasing? Can I use the menu on multiple Social club accounts?",
		name:"afterpurchase",
		description:stripIndents`Message an @Administrator with proof of payment and a Social Club name for first login; they will whitelist your account and give you the VIP role.
			(Once you login to the account you provided the first time, you can use the menu on as many accounts as you want on the same PC.)
			Be patient, the activation is manual and the admins aren't robots, they have to sleep too :) Please allow up to 12 hours.`
	},
	{
		title:"5. MSVCP???.dll is missing",
		name:"msvcp",
		description:"If you get this error it means you don't have Visual Redistrib C++ 2015, you can download it here: https://www.microsoft.com/en-us/download/details.aspx?id=48145"
	},
	{
		title:"6. I get kicked to story mode after using 15mil stealth",
		name:"storymodekick",
		description:"The method is \"semi-patched\", you can only use it twice in a range of 1/2 minutes. If you wish to use it faster try changing session after using it two times"
	},
	{
		title:"7. I can't enter any activities / Game features are blocked",
		name:"mechanicmachinebroke",
		description:"If you can't do that it's because you have \"Script event\" ticked in Protection menu. Make sure you untick it before doing activities and such !"
	},
	{
		title:"8. Menu detected as trojan/virus",
		name:"virusdetected",
		description:"This is a false detection, no worries. We would never put a virus in the menu\nMake sure you whitelist ``nullifyggr.cluster023.hosting.ovh.net`` in your antivirus"
	},
	{
		title:"9. The menu won't open, no error messages",
		name:"wontopen",
		description:stripIndents`If you get this try running the Launcher.exe (provided when you bought the cheat) as administrator.
			If it's still not working, disable SmartScreen (if you're on windows 10) as well as your anti virus.
			And if you are on Windows 7 and have this problem, please PM me.\n\nMake sure you whitelist \`\`nullifyggr.cluster023.hosting.ovh.net\`\` in your antivirus`
	},
	{
		title:"10. Set Level is crashing",
		name:"setlevelcrash",
		description:stripIndents`If you are crashing while trying to set level, try it from your other character to your main one.
			Thanks Harri, he found that`
	},
	{
		title:"11. Is there a way to change keybindings?",
		name:"changekeybinds",
		description:`Yes, you can change primary (numpad) and secondary controls.
			Press Windows+R and type \`\`%appdata%\\Nullify\`\`, then edit **Nullify.ini.**`
	},
	{
		title:"12. What is Dev Mode? How do I use it?",
		name:"devmode",
		description:stripIndents`Load GTA in singleplayer and launch Nullify as usual. In the Pause menu > Online > Play GTA Online, there should be a blank option underneath 'Solo Session'. Select this and you'll load into dev mode with a view over the city. You can join and leave sessions as normal, and can use all the features of Nullify.
			You can either spectate players or use Ctrl to toggle freecam. You can't use Esc to open the pause menu; use P instead. Freecam controls: W/A/S/D move your camera as normal, Page Up and Page Down raise and lower it, respectively.
			While in Dev Mode, you won't appear on the player list at all; your name will only show up if you kill someone or type in chat. Dev Mode will be active until you restart the game.`
	},
	{
		title:'13. I got an error "Failed to download required files."',
		name:"downloadfail",
		description:stripIndents`There are a few reasons this could happen. Running the launcher as admin will usually fix it. If not try disabling your antivirus/firewall or re-downloading the launcher.`
	}
]

exports.run = async (client, msg, args) => {
	msg.delete();
	if(args[0] === "faq") {
		if(args[1] === "list") {
			let faqs = "";
			for(var i=0;i<this.faqList.length;i++) {
				if(i==0) {
					faqs = `(${i+1})${this.faqList[i].name}`;
					continue;
				}
				faqs += `, (${i+1})${this.faqList[i].name}`;
			}
			return msg.channel.send(`There are ${this.faqList.length} faq's:\n${faqs}`);
		}
		var faqID = parseInt(args[1]) - 1;
		if(!isNaN(faqID)){
			if(exports.faqList[faqID]) {
				const faq = exports.faqList[faqID];
				return msg.channel.send({embed: {
					title:faq.title,
					color:globalColor,
					description:faq.description,
					footer:{text:faq.footer},
					fields:faq.fields,
					image:{url:faq.image}
				}});
			}
			return msg.channel.send("Unknown FAQ ID");
		}
		return msg.channel.send("Unknown FAQ id")
	}else if(args[0] === "faqs") {
		let faqs = "";
		for(var i=0;i<this.faqList.length;i++) {
			if(i==0) {
				faqs = `(${i+1})${this.faqList[i].name}`;
				continue;
			}
			faqs += `, (${i+1})${this.faqList[i].name}`;
		}
		return msg.channel.send(`There are ${this.faqList.length} faq's:\n${faqs}`);
	}else if(args[0] === "convert") {
		msg.channel.send(stripIndents`If you want to go from Steam-GTAV to Rockstar-GTA, do the following steps:
		1. Go to your Steam directory for Grand Theft Auto V (Program Files - Steam - steamapps - Common - Grand Theft Auto V)
		2. Make a new directory and copy the files from that (if you want to play steam edition ever without redownloading)
		2. Delete everything except the .rpf files and the folders. Delete x64a.rpf
		3. Download the Rockstar game client download (available via the Social Club website, click on the little gear beside your name and Game Downloads)
		4. Use the .exe you just downloaded to Repair the files.
		5. Launch with PlayGTAV.exe`)
	}else{
		msg.channel.send("Unknown option ``" + args[0] + "``");
	}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'nullify',
  description: 'for nullify menu',
  usage: 'Nullify <faq/?> <number>'
};
