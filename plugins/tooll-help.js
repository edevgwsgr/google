const str = `
▢ *hello,* ${taguser}

_*< Your Accounte />*_

▢ *Level :* ${level}
▢ *Exp :* ${exp}
▢ *Diamantes :* ${limit}
▢ *Premium :* ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌')}
▢ *Registrado :* ${user.registered === true ? '✅' : '❌'}
_*< Owner Bot  Majnon />*_

https://instagram.com/majnon._.98

_*< Bot Commnds />*_
...
_*< Other Commnds />*_

▢ _/infobot_
▢ _/math_

_*< Contact Bot Owner />*_
`;

const ownerNumber = '212641207087'; // Replace this with the bot owner's number

const buttons = [
  { buttonId: 'contact_owner', buttonText: { displayText: 'Contact Bot Owner' }, type: 1, 
    sections: [{ rows: [{ title: `Contact Bot Owner`, description: `${ownerNumber}`, buttonId: `${ownerNumber}` }] }] 
  }
];

if (m.isGroup) {
  // Send menu with button in a group
  const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
  conn.sendMessage(m.chat, {image: await genProfile(conn, m), caption: str.trim(), buttons, mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
} else {
  // Send menu with button in a personal chat
  const fkontak2 = {'key': {'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': 'Halo'}, 'message': {'contactMessage': {'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}, 'participant': '0@s.whatsapp.net'};
  conn.sendMessage(m.chat, {image: await genProfile(conn, m), caption: str.trim(), buttons, mentions: [...str.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net')}, {quoted: fkontak2});
}
