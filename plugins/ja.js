import fetch from 'node-fetch';
import cheerio from 'cheerio';

let handler = async (m, { conn, text }) => {
    if (!text) throw 'Please provide a search query.';
    m.react('⌛');
    let msg = encodeURIComponent(text);
    let res = await fetch(`https://www.bing.com/images/create?q=${msg}`);
    let body = await res.text();
    let $ = cheerio.load(body);
    let imageUrl = $('.img_cont').first().find('img').attr('src');
    if (!imageUrl) throw 'No results found for the given query';
    let imageRes = await fetch(imageUrl);
    let buffer = await imageRes.buffer();
    conn.sendFile(m.chat, buffer, 'image.png', `${text}`, m);
    m.react('✅');
}

handler.help = ['createimg <text>'];
handler.tags = ['AI'];
handler.command = /^c$/i;

export default handler;