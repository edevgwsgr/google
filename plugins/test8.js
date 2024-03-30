import axios from "axios"

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
    let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
    await m.reply(wait)

    try {
        let data = await textToImage(text)
        if (data) {
            await conn.sendFile(m.chat, data.image_url, '', `Image for ${text}`, m, false, {
                mentions: [m.sender]
            });
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["photoleap"]
handler.tags = ["ai"];
handler.command = /^(test8)$/i
handler.premium = true

export default handler

async function textToImage(text) {
    try {
        const response = await axios.get("https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + encodeURIComponent(text), {
            headers: {
                "Ocp-Apim-Subscription-Key": "YOUR_BING_API_KEY"
            }
        })
        const image_url = response.data.value[0].contentUrl
        return {
            image_url
        }
    } catch (err) {
        return null;
    }
}