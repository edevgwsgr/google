import { createHash } from 'crypto';

let Reg = /\|?(.*?)([.|] *?)([0-9]*) (.*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {

  let user = global.db.data.users[m.sender];

  if (user.registered !== true) {
    m.reply('*مرحبًا، للمتابعة مع هذه الوظيفة يجب عليك التسجيل!*\n\n*مثال: /make-account الاسم.العمر الدولة*\n\n*يرجى الاحتفاظ برقم تسلسلي*');
    return;
  }

  let name2 = conn.getName(m.sender);

  if (!Reg.test(text)) throw `⚠️ صيغة غير صحيحة\n\n ✳️ استخدم هذا الأمر: *${usedPrefix + command} الاسم.العمر الدولة*\n📌مثال: *${usedPrefix + command}* ${name2}.16 USA`;

  let [_, name, splitter, age, country] = text.match(Reg);

  if (!name) throw '✳️ لا يمكن ترك الاسم فارغًا';

  if (!age) throw '✳️ العمر لا يمكن أن يكون فارغًا';

  if (!country) throw '✳️ الدولة لا يمكن أن تكون فارغة';

  if (name.length >= 30) throw '✳️ الاسم طويل جدًا';

  age = parseInt(age);

  if (age > 100) throw '👴🏻 واو جدا جداً يريد الجد اللعب';

  if (age < 5) throw '🚼  يوجد طفل جداً جداً ';

  user.name = name.trim();

  user.age = age;

  user.country = country.trim();

  user.regTime = + new Date();

  let sn = createHash('md5').update(m.sender).digest('hex');

  // Get user profile picture
  let pp = await conn.getProfilePictureFromServer(m.sender);

  m.reply(`
👤 *الصورة الشخصية*
${pp}
👤 *الاسم :* ${name}
👤 *العمر :* ${age} سنة
👤 *الدولة :* ${country}
👤 *وقت التسجيل :* ${new Date(user.regTime).toLocaleDateString()}
👤 *الرقم التسلسلي :* ${sn}
`.trim());
};

handler.help = ['reg'].map(v => v + ' <الاسم.العمر الدولة>');

handler.tags = ['rg'];

handler.command = ['verify', 'make-account', 'register', 'registrar'];

export default handler;
