const {Client,Collection}= require("discord.js");
const client = new Client({
  messageSweepInterval:240,
  messageCacheLifetime:1200,
  disabledEvents:['TYPING_START','USER_UPDATE','VOICE_SERVER_UPDATE','CHANNEL_PINS_UPDATE','GUILD_CREATE','GUILD_DELETE','CHANNEL_UPDATE','GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'CHANNEL_PINS_UPDATE',
  'USER_NOTE_UPDATE', 'USER_SETTINGS_UPDATE', 'PRESENCE_UPDATE', 'VOICE_STATE_UPDATE','RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE']
})

if(process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system. If you ask me 'why doesn't your selfbot work' and I see this error I will slap you silly.");

const config = require('./config.json');
const fs = require("fs");

client.config = config;

require("./modules/functions.js")(client);
client.db = require("./modules/PersistentDB.js");

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    if(f.split(".").slice(-1)[0] !== "js") return;
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    if(props.init) props.init(client);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

fs.readdir('./events/', (err, files) => {
  if (err) console.error(err);
  console.log(`Loading a total of ${files.length} events.`);
  files.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.login(config.botToken);
client.password = config.password;
