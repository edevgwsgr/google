import { search, download } from 'aptoide-scraper';

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text) throw `*[❗] Please enter the name of the APK you want to search for.*`;
  try {
    await conn.sendMessage(m.chat, '*[⏳] Searching for the requested APK. Please wait...*', { quoted: m });

    const searchResults = await search(text);
    const data = await download(searchResults[0].id);

    let response = `📲 *Aptoide Downloader* 📲\n\n📌 *Name:* ${data.name}\n📦 *Package:* ${data.package}\n🕒 *Last Update:* ${data.lastup}\n📥 *Size:* ${data.size}`;

    await conn.sendMessage(m.chat, { image: { url: data.icon }, caption: response }, { quoted: m });

    if (data.size.includes('GB') || data.size.replace(' MB', '') > 30000) {
      return await conn.sendMessage(m.chat, '*[⛔] The file is too heavy to be sent.*', { quoted: m });
    }

    await conn.sendMessage(m.chat, {
      document: {
        url: data.dllink,
        mimetype: 'application/vnd.android.package-archive',
        fileName: data.name + '.apk',
        caption: null
      }
    }, { quoted: m });
  } catch {
    throw `*[❗] Error, no results found for your search.*`;
  }
};

handler.command = /^(apkmod|modapk|dapk2|aptoide|aptoidedl)$/i;

export default handler;
