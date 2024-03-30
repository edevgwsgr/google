import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*هذا الأمر يولّد صورًا من النصوص*\n\n*مثال على الاستخدام*\n*◉ ${usedPrefix + command} فتاة أنمي جميلة*\n*◉ ${usedPrefix + command} إيلون ماسك باللون الوردي*`;

  try {
    m.reply('*الرجاء الانتظار، جارٍ إنشاء الصور...*');

    const endpoint = `https://cute-tan-gorilla-yoke.cyclic.app/imagine?text=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    
    if (response.ok) {
      const imageBuffer = await response.buffer();
      await conn.sendFile(m.chat, imageBuffer, 'image.png', null, m);
    } else {
      throw '*فشل إنشاء الصورة*';
    }
  } catch {
    throw '*عذرًا! حدث خطأ ما أثناء إنشاء الصور. يرجى المحاولة مرة أخرى لاحقًا.*';
  }
};

handler.help = ['dalle'];
handler.tags = ['AI'];
handler.command = ['dal', '456', 'imagin', 'openai2'];
export default handler;
