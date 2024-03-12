import { createHash } from 'crypto';

const handler = async function (m, { args }) {
  if (!args[0])
    throw 'Enter your server number, if you don\'t remember your server number, use the command #myns';

  const user = global.db.data.users[m.sender];
  const sn = createHash('md5').update(m.sender).digest('hex');

  if (args[0] !== sn)
    throw 'Incorrect server number, compare it with the one you saved when you registered!*\n\n*If you don\'t remember your saved server number, use the command #myns';

  user.registered = false;
  m.reply(`Successfully unregistered, you are no longer registered in the bot`);
};

handler.help = ['verify'];
handler.tags = ['xp'];
handler.command = /^(del-verify|del-account)$/i;
handler.register = true;

export default handler;
