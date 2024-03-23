import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js';

const handler = async (m, { conn, text }) => {
    let json;

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        let buffer = await q.download();
        let media = await uploadImage(buffer);
        json = await (await fetch(`https://aemt.me/removebg?url=${media}`)).json();
    } else if (text && isUrl(text.trim())) {
        json = await (await fetch(`https://aemt.me/removebg?url=${text.trim()}`)).json();
    } else {
        return conn.reply(m.chat, ` *الرد على صورة أو أدخل عنوان URL الذي هو (JPG أو JPEG أو PNG) لإزالة الخلفية*`, m);
    }

    // عرض رسائل الانتظار
    await showWaitingMessages(conn, m);

    // إرسال الصورة المعالجة
    await conn.sendFile(m.chat, json.url.result, 'processed_image.png', '', m);
}

handler.command = /^(s?removebg)$/i;
handler.limit = 4;
export default handler;

const isUrl = (text) => {
    const urlRegex = /^(https?):\/\/[^\s/$.?#]+\.(jpe?g|png)$/i;
    return urlRegex.test(text);
}

async function showWaitingMessages(conn, m) {
    const messages = [
        '_*جاري المعالجة...▬▭▭▭▭▭▭*_',
        '_*جاري المعالجة...▬▬▭▭▭▭▭*_',
        '_*جاري المعالجة...▬▬▬▭▭▭▭*_',
        '_جاري المعالجة... ▬▬▬▬▭▭▭_',
        '_جاري المعالجة... ▬▬▬▬▬▭▭_',
        '_جاري المعالجة... ▬▬▬▬▬▬▭_',
        '_جاري المعالجة... ▬▬▬▬▬▬▬_',
        '*(المعالجة) تمت بنجاح*'
    ];
    let key;
    key = await conn.sendMessage(m.chat, { text: '_*جاري المعالجة...*_', quoted: m });
    for (let i = 0; i < messages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.sendMessage(m.chat, { text: messages[i], edit: key });
    }
}
