import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر يولد صورًا من النصوص*\n\n*مثال على الاستخدام*\n*◉ ${usedPrefix + command} توصيف الصورة*\n`;

  try {
    m.reply('*الرجاء الانتظار، يتم إنشاء الصوت...*');

    const endpoint = `https://elevenlabs.io/api/text-to-speech?text=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    
    if (response.ok) {
      const audioBuffer = await response.buffer();
      await conn.sendFile(m.chat, audioBuffer, 'audio.mp3', null, m);
    } else {
      throw '*فشل إنشاء الصوت*';
    }
  } catch (error) {
    throw '*عذرًا! حدث خطأ ما أثناء إنشاء الصوت. الرجاء المحاولة مرة أخرى لاحقًا.*';
  }
};

handler.help = ['صوت'];
handler.tags = ['AI'];
handler.command = ['صوت', 'test7'];
export default handler;
