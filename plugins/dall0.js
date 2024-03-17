import fetch from 'node-fetch';

var fake = {
  participant: '0@s.whatsapp.net',
  jid: '0@s.whatsapp.net',
  notify: '0@s.whatsapp.net'
};

var lolkeysapi = 'YOUR_API_KEY';

var handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `*🎌 Ingrese un texto para crear una imagen*\n\nEjemplo, !dall2 gatitos llorando`, m, fake);

  conn.reply(m.chat, '⏰ Espere un momento', m, fake);

  try {
    let res1 = await fetch(`https://vihangayt.me/tools/imagine?q=${text}`);
    let json1 = await res1.json();
    await conn.sendMessage(m.chat, json1.data, 'image/jpeg', 'Aquí está la imagen que generé para ti.', m);
  } catch {
    console.log('🚩 Error en la api número 1 de dall-e 2.');
    try {
      let res2 = await fetch(`https://vihangayt.me/tools/midjourney?q=${text}`);
      let json2 = await res2.json();
      await conn.sendMessage(m.chat, json2.data, 'image/jpeg', 'Aquí está la imagen que generé para ti.', m);
    } catch {
      console.log('🚩 Error en la api número 2 de dall-e 2.');
      try {
        let res3 = await fetch(`https://vihangayt.me/tools/lexicaart?q=${text}`);
        let json3 = await res3.json();
        await conn.sendMessage(m.chat, json3.data[0].images[0].url, 'image/jpeg', 'Aquí está la imagen que generé para ti.', m);
      } catch {
        console.log('🚩 Error en la api número 3 de dall-e 2.');
        try {
          let res4 = await fetch(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`);
          let json4 = await res4.json();
          await conn.sendMessage(m.chat, json4.data, 'image/jpeg', 'Aquí está la imagen que generé para ti.', m);
        } catch {
          console.log('🚩 Error, ninguna api funciona.');
          return conn.reply(m.chat, `*🚩 Ocurrió un fallo*`, m, fake);
        }
      }
    }
  }
};

handler.help = ['dall2'];
handler.tags = ['ai'];
handler.command = /^(dall0)/i;

export default handler;