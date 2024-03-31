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

    // String placeholders for waiting and error messages
    const waitMessage = "Please wait while processing...";
    const errorMessage = "An error occurred while processing the request.";

    await m.reply(waitMessage)

    try {
        let data = await textToImage(text)
        if (data && data.result_url) {
            await conn.sendFile(m.chat, data.result_url, '', `Image for ${text}`, m, false, {
                mentions: [m.sender]
            });
        } else {
            await m.reply("Failed to generate image.")
        }
    } catch (e) {
        console.error("Error processing request:", e);
        await m.reply(errorMessage)
    }
}

handler.help = ["photoleap"]
handler.tags = ["ai"];
handler.command = /^(imagine2)$/i
handler.premium = true

export default handler

/* New Line */
async function textToImage(text) {
    try {
        const {
            data
        } = await axios.get("https://api.openai.com/v1/images/generations?prompt=" + text)
        return data;
    } catch (err) {
        console.error("Axios error:", err);
        return null;
    }
}
