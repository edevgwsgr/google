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
    } else throw "Input Teks";
    await m.reply(wait);

    try {
        let data = await textToImage(text);
        if (data) {
            await conn.sendFile(m.chat, data.result_url, '', `Image for ${text}`, m, false, {
                mentions: [m.sender]
            });
        }
    } catch (e) {
        await m.reply(eror);
    }
};

handler.help = ["photoleap"];
handler.tags = ["ai"];
handler.command = /^(imagine3)$/i;
handler.premium = true;

export default handler;

/* New Line */
async function textToImage(text) {
    try {
        const {
            data
        } = await axios.get("https://api.gemini.ai/v1/txt2img?text=" + encodeURIComponent(text));
        return data;
    } catch (err) {
        return null;
    }
}