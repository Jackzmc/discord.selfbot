var globalColor = 8642457;

exports.antiviruses = [
	{
		name:"eset",
		description:"This will work for ESET NOD32 Antivirus and ESET Smart Security. The layout may be slightly different depending on your version.",
		fields:[
			{
				name:"Step 1",
				value:`Open up the main window and click on the \`\`setup\`\` button. Click the settings wheel next to \`\`web access protection\`\`.\n
Head to \`\`URL ADDRESS MANAGEMENT\`\` and click on Address List, and press Edit.`
			},
			{
				name:"Step 2",
				value:`Click on the List of allowed addresses, and then on the bottom press the [Edit] button. Now press the [Add] button and type in this exactly:
\`\`\`*.cluster023.hosting.ovh.net/*\`\`\` 
Press [OK], and [OK] again. You may have to repeat this for \`\`List of addresses excluded from checking\`\``
					
			}
		],
		
	}
];

exports.faqList = [
	{
		title:"1. First usage",
		description:"Open the game and go into story mode, then open the .exe provided when you bought the menu.",
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
		description:"NUMLOCK Is required for most of the keyboards (if it doesn't work with numlock, try without) \nNumpad----------------------- \n:seven:/:nine: = :arrow_left:/:arrow_right: tabs \n:four:/:six: = :arrow_left:/:arrow_right: values \n:eight:/:two: = :arrow_up:/:arrow_down: \n------------------------------ \n:five: enter :zero: return\n —— show/hide :regional_indicator_f::nine: close",
		image: "https://cdn.discordapp.com/attachments/332200393406939139/332217936343203841/null.png",
	},
	{
		title:"3. Autoupdates",
		description:"The menu is auto-updating itself, you don't have to download anything else than the .exe we gave you when you bought the menu. If you are having trouble with the menu, try downloading the launcher again"
	},
	{
		title:"4. What do I do after purchasing? Can I use the menu on multiple Social club accounts?",
		description:`Message an @Administrator with proof of payment and a Social Club name for first login; they will whitelist your account and give you the VIP role.
			(Once you login to the account you provided the first time, you can use the menu on as many accounts as you want on the same PC.)
			Be patient, the activation is manual and the admins aren't robots, they have to sleep too :) Please allow up to 12 hours.`
	},
	{
		title:"5. MSVCP???.dll is missing",
		description:"If you get this error it means you don't have Visual Redistrib C++ 2015, you can download it here: https://www.microsoft.com/en-us/download/details.aspx?id=48145"
	},
	{
		title:"6. I get kicked to story mode after using 15mil stealth",
		description:"The method is \"semi-patched\", you can only use it twice in a range of 1/2 minutes. If you wish to use it faster try changing session after using it two times"
	},
	{
		title:"7. I can't enter any activities / Game features are blocked",
		description:"If you can't do that it's because you have \"Script event\" ticked in Protection menu. Make sure you untick it before doing activities and such !"
	},
	{
		title:"8. Menu detected as trojan/virus",
		description:"This is a false detection, no worries. We would never put a virus in the menu\nMake sure you whitelist ``nullifyggr.cluster023.hosting.ovh.net`` in your antivirus"
	},
	{
		title:"9. The menu won't open, no error messages",
		description:`If you get this try running the Launcher.exe (provided when you bought the cheat) as administrator.
			If it's still not working, disable SmartScreen (if you're on windows 10) as well as your anti virus.
			And if you are on Windows 7 and have this problem, please PM me.\n\nMake sure you whitelist \`\`nullifyggr.cluster023.hosting.ovh.net\`\` in your antivirus`
	},
	{
		title:"10. Set Level is crashing",
		description:`If you are crashing while trying to set level, try it from your other character to your main one.
			Thanks Harri, he found that`
	},
	{
		title:"11. Is there a way to change keybindings?",
		description:`Yes, you can change primary (numpad) and secondary controls.
			Press Windows+R and type \`\`%appdata%\Nullify\`\`, then edit **Nullify.ini.**`
	},
	{
		title:"12. What is Dev Mode? How do I use it?",
		description:`Load GTA in singleplayer and launch Nullify as usual. In the Pause menu > Online > Play GTA Online, there should be a blank option underneath 'Solo Session'. Select this and you'll load into dev mode with a view over the city. You can join and leave sessions as normal, and can use all the features of Nullify.
			You can either spectate players or use Ctrl to toggle freecam. You can't use Esc to open the pause menu; use P instead. Freecam controls: W/A/S/D move your camera as normal, Page Up and Page Down raise and lower it, respectively.
			While in Dev Mode, you won't appear on the player list at all; your name will only show up if you kill someone or type in chat. Dev Mode will be active until you restart the game.`
	},
	{
		title:'13. I got an error "Failed to download required files."',
		description:`There are a few reasons this could happen. Running the launcher as admin will usually fix it. If not try disabling your antivirus/firewall or re-downloading the launcher.`
	}
]

exports.run = async (client, msg, args) => {
	msg.delete();
  	if(args[0] === "faq") {
		if(args[1] === "list") {
			return msg.channel.send('not ready');
		}
		var faqID = parseInt(args[1]) - 1;
		if(!isNaN(faqID)){
		    if(exports.faqList[faqID]) {
				var faq = exports.faqList[faqID];
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
	}else if(args[0] === "whitelist" || args[0] === "wlist") {
		var wListSearch = exports.antiviruses;
		for(var i=0;i<wListSearch.length;i++) {
			if(wListSearch[i].name === args[1]) {
				return msg.channel.send({embed: {
					title:wListSearch[i].title,
					color:globalColor,
					description:wListSearch[i].description,
					footer:{text:wListSearch[i].footer},
					fields:wListSearch[i].fields,
					thumbnail:{url:wListSearch[i].image}
				}});
			}
		}
		return msg.channel.send("Couldn't find an antivirus named ``" + args[1] + "``").then(m => m.delete(10000));
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
