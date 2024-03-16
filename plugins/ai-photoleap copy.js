import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `Ex : /imagine cat`;

  await conn.sendMessage(m.chat, { text: 'Generating image, please wait a moment.' }, { quoted: m });

  try {
    const tiores1 = await fetch(`https://vihangayt.me/tools/imagine?q=${text}`);
    const json1 = await tiores1.json();
    await conn.sendMessage(m.chat, { image: { url: json1.data } }, { quoted: m });
  } catch {
    console.log('Error in API number 1 (dall-e).');

    try {
      const tiores2 = await conn.getFile(`https://vihangayt.me/tools/midjourney?q=${text}`);
      await conn.sendMessage(m.chat, { image: { url: tiores2.data } }, { quoted: m });
    } catch {
      console.log('Error in API number 2 (dall-e).');

      try {
        const tiores3 = await fetch(`https://vihangayt.me/tools/lexicaart?q=${text}`);
        const json3 = await tiores3.json();
        await conn.sendMessage(m.chat, { image: { url: json3.data[0].images[0].url } }, { quoted: m });
      } catch {
        console.log('Error in API number 3 (dall-e).');

        try {
          const tiores4 = await conn.getFile(`https://api.lolhuman.xyz/api/dall-e?apikey=${lolkeysapi}&text=${text}`);
          await conn.sendMessage(m.chat, { image: { url: tiores4.data } }, { quoted: m });
        } catch {
          console.log('Error, none of the APIs are functional.');
          throw `Error, no results were obtained.`;
        }
      }
    }
  }
};

handler.command = ['imagine2'];

export default handler;
