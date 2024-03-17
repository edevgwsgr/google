import fetch from 'node-fetch';

var handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `*🎌 Ingrese un texto para crear una imagen*\n\nEjemplo, !dall2 gatitos llorando`, m);

    conn.reply(m.chat, '⏰ Espere un momento', m);

    try {
        let res1 = await fetch(`https://vihangayt.me/tools/imagine?q=${encodeURIComponent(text)}`);
        let json1 = await res1.json();
        await conn.sendMessage(m.chat, { image: { url: json1.data } }, { quoted: m });
    } catch (error1) {
        console.log('🚩 Error en la API número 1 de dall-e 2:', error1.message);
        try {
            let res2 = await fetch(`https://vihangayt.me/tools/midjourney?q=${encodeURIComponent(text)}`);
            let json2 = await res2.json();
            await conn.sendMessage(m.chat, { image: { url: json2.data } }, { quoted: m });
        } catch (error2) {
            console.log('🚩 Error en la API número 2 de dall-e 2:', error2.message);
            try {
                let res3 = await fetch(`https://vihangayt.me/tools/lexicaart?q=${encodeURIComponent(text)}`);
                let json3 = await res3.json();
                await conn.sendMessage(m.chat, { image: { url: json3.data[0].images[0].url } }, { quoted: m });
            } catch (error3) {
                console.log('🚩 Error en la API número 3 de dall-e 2:', error3.message);
                try {
                    const res4 = await fetch(`https://api.lolhuman.xyz/api/dall-e?apikey=${encodeURIComponent(lolkeysapi)}&text=${encodeURIComponent(text)}`);
                    const json4 = await res4.json();
                    await conn.sendMessage(m.chat, { image: { url: json4.result } }, { quoted: m });
                } catch (error4) {
                    console.log('🚩 Error, ninguna API funciona:', error4.message);
                    return conn.reply(m.chat, `*🚩 Ocurrió un fallo*`, m);
                }
            }
        }
    }
}

handler.help = ['dall2'];
handler.tags = ['ai'];
handler.command = /^(dall2)/i;

export default handler;
