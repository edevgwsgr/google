import { createHash } from 'crypto';

let Reg = /\|?(.*)([.|] *?)([0-9]*)\.([a-zA-Z ]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {

  let user = global.db.data.users[m.sender];

  if (user.registered !== true) {
    m.reply('*hello, to Continue with this function you should register !*\n\n*Ex : /make-account name.age.country*\n\n*Please keep a serial number*');
    return;
  }

  let name2 = conn.getName(m.sender);

  if (!Reg.test(text)) throw `⚠️ Format incorrect\n\n ✳️ Use this command: *${usedPrefix + command} name.age.country*\n📌Example: *${usedPrefix + command}* ${name2}.16.USA`;

  let [_, name, splitter, age, country] = text.match(Reg);

  if (!name) throw '✳️ The name cannot be empty';

  if (!age) throw '✳️ age cannot be empty';

  if (!country) throw '✳️ country cannot be empty';

  if (name.length >= 30) throw '✳️The name is too long';

  age = parseInt(age);

  if (age > 100) throw '👴🏻 Wow grandpa wants to play bot';

  if (age < 5) throw '🚼  there is a grandpa baby jsjsj ';

  user.name = name.trim();

  user.age = age;

  user.country = country.trim();

  user.regTime = + new Date();

  let sn = createHash('md5').update(m.sender).digest('hex');

  m.reply(`

👤 *Profile Picture*

👤 *Name :* ${name}
👤 *Age :* ${age} years
👤 *Country :* ${country}
👤 *Registration Time :* ${new Date(user.regTime).toLocaleDateString()}
👤 *Number serie :* ${sn}

`.trim());
};

handler.help = ['reg'].map(v => v + ' <name.age.country>');

handler.tags = ['rg'];

handler.command = ['verify', 'make-account', 'register', 'registrar'];

export default handler;
