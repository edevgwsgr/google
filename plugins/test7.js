import axios from "axios";

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else {
        throw "Input Teks";
    }
    await m.reply(wait);

    try {
        let imageURL = await textToImage(text);
        if (imageURL) {
            await conn.sendFile(m.chat, imageURL, '', `Image for ${text}`, m, false, {
                mentions: [m.sender]
            });
        }
    } catch (e) {
        await m.reply(eror);
    }
};

handler.help = ["photoleap"];
handler.tags = ["ai"];
handler.command = /^(test7)$/i;
handler.premium = true;

export default handler;

async function textToImage(text) {
    try {
        const searchTerm = encodeURIComponent(text);
        const {
            data
        } = await axios.get(`https://www.bing.com/images/search?q=${searchTerm}&view=detailv2&iss=sbi&form=sbivmi`);

        // يمكنك استخدام مكتبة مثل cheerio لاستخراج رابط الصورة من النص HTML هنا
        // وإرجاعه لاستخدامه في الإرسال

        return imageURL; // استبدل imageURL برابط الصورة الذي تم استخراجه
    } catch (err) {
        return null;
    }
}
