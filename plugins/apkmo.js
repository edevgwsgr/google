import axios from 'axios';

const searchAndDownload = async (query) => {
  const searchUrl = `https://m.apkpure.fr/fr/search?q=${encodeURIComponent(query)}`;
  try {
    const response = await axios.get(searchUrl);
    const firstResult = response.data.match(/<a[^>]*class="search-dl"[^>]*href="([^"]*)"[^>]*>/);
    if (!firstResult) {
      throw new Error('No results found');
    }
    const downloadUrl = `https://m.apkpure.fr${firstResult[1]}`;
    return downloadUrl;
  } catch (error) {
    throw new Error('Error searching for the app');
  }
};

const handler = async (m, { conn, text }) => {
  try {
    if (!('text' in m)) {
      throw new Error('Por favor, proporcione el nombre de la aplicación que desea buscar');
    }
    const downloadUrl = await searchAndDownload(text);
    await conn.sendMessage(m.chat, { url: downloadUrl }, 'document', { quoted: m });
  } catch (error) {
    await conn.sendMessage(m.chat, error.message, 'text', { quoted: m });
  }
};

handler.command = /^(apkmo)$/i;
handler.register = true;
handler.limit = 2;

export default handler;