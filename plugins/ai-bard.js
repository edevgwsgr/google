import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🎌 *Ingresa una petición*\n\nEjemplo: ${usedPrefix}bard ¿Conoces a CuriosityBot-MD?`, m, fake);

    try {
        conn.sendPresenceUpdate('composing', m.chat);
        const response = await fetch(`https://aemt.me/bard?text=${encodeURIComponent(text)}`);
        const data = await response.json();
        await m.reply(data.result);
    } catch (error) {
        console.error(error);
        return conn.reply(m.chat, `*🚩 Ocurrió un fallo*`, m, fake);
    }
};

handler.command = ['bard'];
handler.help = ['bard'];
handler.tags = ['ai'];
handler.premium = false;

export default handler;
