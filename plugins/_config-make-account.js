import { createHash } from 'crypto';

// Assuming mssg is imported or defined somewhere in your code
// let mssg = require('./messages'); 

let Reg = /\|?(.*)([.|+] *?)([0-9]*)([.|+] *?)([MFNO])([.|+] *?)([\w\s]*)?$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender];
  let name2 = conn.getName(m.sender);
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/avatar_contact.png');

  if (user.registered === true) throw `✳️ Registration is already completed.\n\n${usedPrefix}unreg <serial number>`;

  let te = `✳️ Please use the command in the following format: *${usedPrefix + command} name+age+gender+country*\n📌 Example: *${usedPrefix + command}* John+25+M+USA\n\n▢ Gender List:\n*- M* = Male\n*- F* = Female\n*- N* = Other`;

  if (!Reg.test(text)) throw te;

  let [_, name, splitter, age, splitter2, gen, splitter3, country] = text.match(Reg);

  if (!name || !age || !country) throw te;

  if (name.length >= 30) throw `✳️ Maximum length of name exceeded.`;

  age = parseInt(age);
  if (age > 60) throw `👴🏻 You are too old to register.`;
  if (age < 10) throw '🚼 You must be at least 10 years old to register.';

  let genStr = gen && gen.toUpperCase() === 'M' ? `🙆🏻‍♂️ Male` : (gen && gen.toUpperCase() === 'F' ? `🤵🏻‍♀️ Female` : (gen && gen.toUpperCase() === 'N' ? `⚧ Other` : null));

  if (!genStr) throw `✳️ Gender should be either M, F, or N\n\n*- M* = Male\n*- F* = Female\n*- N* = Other`;

  user.name = name.trim();
  user.age = age;
  user.gender = genStr;
  user.country = country.trim();
  user.regTime = +new Date;
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex');
  let regi = `
┌─「 *REGISTRATION* 」─
▢ *Name:* ${name}
▢ *Age:* ${age}
▢ *Gender:* ${genStr}
▢ *Country:* ${country}
▢ *Serial Number:*
${sn}
└──────────────`;

  conn.sendFile(m.chat, pp, 'img.jpg', regi, m);
}

handler.help = ['reg'].map(v => v + ' ');
handler.tags = ['registration'];
handler.command = ['verify', 'reg', 'regi', 'make-account'];

export default handler;
handler.group = false;
