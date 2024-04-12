import { search, download } from 'moddroid-scraper';

const handler = async (m, { conn, command, text }) => {
    if (!text) throw `*Example: ${command} minecraft*`;
    try {
        const results = await search(text);
        if (!results || !results.length) throw 'No results found';

        const data = await download(results[0].id);
        if (!data) throw 'Failed to fetch app data';

        const response = `
📲 *App Name:* ${data.name}
📦 *Package ID:* ${data.package}
🕒 *Last Update:* ${data.lastup}
💪 *Size:* ${data.size}
`;

        if (data.icon) {
            await conn.sendMessage(m.chat, { image: { url: data.icon }, caption: response }, { quoted: m });
        } else {
            throw 'App icon not found';
        }

        if (data.dllink) {
            await conn.sendMessage(m.chat, { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk' }, { quoted: m });
        } else {
            throw 'APK download link not found';
        }
    } catch (error) {
        console.error(error);
        throw 'An error occurred while processing the request.';
    }
};

handler.command = /^(testa)$/i;
handler.register = true;
handler.limit = 2;

export default handler;