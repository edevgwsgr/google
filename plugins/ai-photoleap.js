const fetch = require('node-fetch'); // Import statement corrected

var handler = async (message, { conn, isOwner, usedPrefix, command, args }) => { // Corrected parameter name m to message

    let text;
    if (args.length >= 1) {
        text = args.join(' '); // Changed args.slice(0) to args.join(' ')
    } else if (message.quoted && message.quoted.text) {
        text = message.quoted.text;
    } else {
        return conn.reply(message.chat, `*🎌 Este comando genera imágenes a partir de textos*\n\nEjemplo: ${usedPrefix}dalle Estrella naciente`, message.fake);
    }

    try {
        conn.reply(message.chat, '⏰ Espere un momento', message.fake); // Removed fake variable
        await Draw(text).then((img) => {
            conn.sendFile(message.chat, img, `${text}.png`, `*🍧 Resultado de ${text}*\n\n`, message);
        });
    } catch (e) {
        return conn.reply(message.chat, `*🚩 Ocurrió un fallo*`, message.fake); // Removed fake variable
    }
}

handler.help = ['dalle'];
handler.tags = ['ai'];
handler.command = /^(dalle|openiamage|aiimage|aiimg|aimage|iaimagen|openaimage|openaiimage)/i;

module.exports = handler; // Changed export to module.exports

async function Draw(prompt) { // Changed propmt to prompt
    const Blobs = await fetch(
        'https://api-inference.huggingface.co/models/prompthero/openjourney-v2',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: 'Bearer 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',
            },
            body: JSON.stringify({ inputs: prompt }), // Changed propmt to prompt
        }
    ).then((res) => res.blob());

    const arrayBuffer = await Blobs.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
}
