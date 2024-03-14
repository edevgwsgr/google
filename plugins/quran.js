import { alquran } from '@bochilteam/scraper';

let handler = async (m, { args, usedPrefix, command }) => {
    try {
        // التحقق من توفر رقم السورة ورقم الآية
        if (!(args[0] && args[1])) 
            throw `البحث عن أي آية في القرآن بالصوت والقراءة :\n${usedPrefix + command} 1 2\n\nإذا لم تفهم أي شيء راسلني هنا: instagram.com/majnon._.98`;
        
        // التحقق من أن الأرقام المدخلة صحيحة
        if (isNaN(args[0]) || isNaN(args[1])) 
            throw `مثال:\n${usedPrefix + command} 1 2\n\ninstagram.com/noureddine_ouafy`;
        
        // جلب بيانات الآية من القرآن
        let api = await alquran();

        // استخراج النص والترجمة ورقم السورة والآية
        const surahIndex = args[0] - 1;
        const verseIndex = args[1] - 1;
        const verseText = api[surahIndex].ayahs[verseIndex].text.ar;
        const verseTranslation = api[surahIndex].ayahs[verseIndex].translation.en;
        const surahShortName = api[surahIndex].asma.en.short;
        const surahNumber = api[surahIndex].ayahs[verseIndex].number.insurah;

        // إعداد الرسالة
        let message = `
${verseText}
    
${verseTranslation}
( Q.S ${surahShortName} : ${surahNumber} )
`.trim();

        // إرسال الرسالة
        m.reply(message);

        // إرسال الملف الصوتي
        conn.sendFile(m.chat, api[surahIndex].ayahs[verseIndex].audio.url, '', '', m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, 'حدث خطأ أثناء معالجة الطلب', m);
    }
};

handler.help = ['ayta'].map(v => v + ' *رقم السورة*');
handler.tags = ['islam'];
handler.command = /^(ayat(mp3|audio)|aya)$/i;

export default handler;