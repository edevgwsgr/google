import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';

const handler = async (m, { conn }) => {
  const name = conn.getName(m.sender);
  const usertag = '@' + m.sender.split('@s.whatsapp.net')[0];
  const user = global.db.data.users[m.sender];
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    const { min, xp, max } = xpRange(user.level, global.multiplier);
    const message = `
🏰 *Adventurer's Guild*
*Welcome, ${usertag}!*

*◉ Current Level:* ${user.level}
*◉ Current Rank:* ${user.role}
*◉ Experience Points:* ${user.exp - min}/${xp}

*—◉ To level up, you need to earn ${max - user.exp} more experience points. Keep interacting with the Bot!.*`.trim();
    return conn.sendMessage(m.chat, {text: message, mentions: [m.sender]}, {quoted: m});
  }
  const before = user.level * 1;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
  if (before !== user.level) {
    const levelUpMessage = `🎉 Congratulations, ${name}! You've leveled up to ${user.level}`;
    const levelUpDetails = `
🚀 *New Level Achieved*

*◉ Previous Level:* ${before}
*◉ New Level:* ${user.level}
*◉ Current Rank:* ${user.role}

*—◉ Keep exploring and completing quests to reach new heights in the Adventurer's Guild. Keep interacting with the Bot!.*`.trim();
    try {
      const levelUpImage = await levelup(levelUpMessage, user.level);
      conn.sendFile(m.chat, levelUpImage, 'levelup.jpg', levelUpDetails, m);
    } catch (e) {
      conn.sendMessage(m.chat, {text: levelUpDetails, mentions: [m.sender]}, {quoted: m});
    }
  }
};
handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = ['level', 'lvl', 'levelup']; // Added alternative command names 'level', 'lvl'
export default handler;
