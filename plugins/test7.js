import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر يولد صورًا من النصوص*\n\n*مثال على الاستخدام*\n*◉ ${usedPrefix + command} توصيف الصورة*\n`;

  try {
    m.reply('*الرجاء الانتظار، يتم إنشاء الصوت...*');

    const response = await axios.get('https://elevenlabs.io/api/text-to-speech', {
      params: {
        text: text
      }
    });
    
    if (response.status === 200) {
      const audioBuffer = Buffer.from(response.data, 'base64');
      await conn.sendFile(m.chat, audioBuffer, 'audio.mp3', null, m);
    } else {
      throw '*فشل إنشاء الصوت*';
    }
  } catch {
    throw '*عذرًا! حدث خطأ ما أثناء إنشاء الصوت. الرجاء المحاولة مرة أخرى لاحقًا.*';
  }
};

handler.help = ['صوت'];
handler.tags = ['AI'];
handler.command = ['صوت', 'test7'];
export default handler;