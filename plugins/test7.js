import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*This command generates images from text prompts*\n\n*𝙴xample usage*\n*◉ ${usedPrefix + command} Beautiful anime girl*\n*◉ ${usedPrefix + command} Elon Musk in pink output*`;

  try {
    m.reply('*Please wait, generating images...*');

    const endpoint = `https://www.bing.com/images/search?q=${encodeURIComponent(text)}`;
    const response = await fetch(endpoint);
    
    if (response.ok) {
      const responseData = await response.text();
      // Extract image URL from responseData, you can use libraries like cheerio or regex for this
      const imageURL = ... // Extract image URL logic here
      if (imageURL) {
        const imageResponse = await fetch(imageURL);
        if (imageResponse.ok) {
          const imageBuffer = await imageResponse.buffer();
          await conn.sendFile(m.chat, imageBuffer, 'image.png', null, m);
        } else {
          throw '*Image generation failed*';
        }
      } else {
        throw '*Image URL not found*';
      }
    } else {
      throw '*Image generation failed*';
    }
  } catch {
    throw '*Oops! Something went wrong while generating images. Please try again later.*';
  }
};

handler.help = ['dalle'];
handler.tags = ['AI'];
handler.command = ['test7'];
export default handler;
