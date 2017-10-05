/* global wait */
const fs = require("fs");
module.exports = async client => {
  client.user.setPresence({status:"invisible"});
  delete client.user.email;
  delete client.user.verified;
  try {
    const { id: rebootMsgID , channel: rebootMsgChan} = JSON.parse(fs.readFileSync('./reboot.json', 'utf8'));
    const m = await client.channels.get(rebootMsgChan).fetchMessage(rebootMsgID);
    await m.edit('Rebooted!');
    await m.edit(`Rebooted! (took: \`${m.editedTimestamp - m.createdTimestamp}ms\`)`);
    fs.unlink('./reboot.json', ()=>{});
  } catch(O_o){}
  await wait(1000);
  console.log(`\x1b[32m[READY] ${client.user.tag} Ready for ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.\x1b[0m`);
  /*const slot_chn = client.guilds.get('137389758228725761').channels.get('359066764811829248');
  setInterval(() => {
    slot_chn.send(";slots 10,000,000,000,000,000");
  },3000)*/
};