const axios = require('axios');
const { Quran } = require('quran-api-node');

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    try {
        const surahNumber = args[0]; // رقم السورة
        const verseNumber = args[1]; // رقم الآية
        const quran = new Quran();
        
        // جلب الآية القرآنية
        const verse = await quran.getVerse(surahNumber, verseNumber);
        
        // جلب الصوت المتعلق بالآية القرآنية
        const audioUrl = await quran.getVerseAudio(surahNumber, verseNumber);
        
        // إرسال النص والصوت إلى المستخدم
        await conn.sendMessage(m.chat, {
            text: verse.text,
            quoted: m,
            audio: { url: audioUrl }
        });
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, 'حدث خطأ أثناء معالجة الطلب', m);
    }
}

handler.command = ['sendquran'];
handler.register = true;
handler.limit = 4;
module.exports = handler;