import axios from 'axios';
import cheerio from 'cheerio';

const searchAndDownload = async (query) => {
  const searchUrl = `https://m.apkpure.fr/fr/search?q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(searchUrl);
    const $ = cheerio.load(response.data);
    const firstResult = $('.search-dl a').first().attr('href');
    if (!firstResult) {
      throw new Error('No results found');
    }
    const downloadUrl = `https://m.apkpure.fr${firstResult}`;
    return downloadUrl;
  } catch (error) {
    throw new Error('Error searching for the app');
  }
};

const handler = async (m, { conn, text }) => {
  try {
    if (!text) {
      throw new Error('Por favor, proporcione el nombre de la aplicación que desea buscar');
    }
    const downloadUrl = await searchAndDownload(text);
    await conn.sendMessage(m.chat, { url: downloadUrl }, 'document', { quoted: m });
  } catch (error) {
    await conn.sendMessage(m.chat, error.message, 'text', { quoted: m });
  }
};

handler.command = /^(apkpure|download|dl)$/i;

export default handler;