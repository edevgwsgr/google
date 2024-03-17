import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) return conn.reply(m.chat, `🎌 *Ingrese una petición*\n\nEjemplo: ${usedPrefix}${command} ¿Conoces CuriosityBot-MD?`, m);

    try {
        conn.sendPresenceUpdate('composing', m.chat);
        const apiResponse = await fetch(`https://aemt.me/bard?text=${encodeURIComponent(text)}`);
        const res = await apiResponse.json();
        await conn.reply(m.chat, res.result);
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, '*🚩 Ocurrió un fallo*', m);
    }
};

handler.command = ['bard'];
handler.help = ['bard'];
handler.tags = ['ai'];
handler.premium = false;

export default handler;
