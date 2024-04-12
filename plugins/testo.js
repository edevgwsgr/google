import { search, download, getAppDeveloper } from 'moddroid-scraper';

const handler = async (m, { conn, command, text }) => {
    if (!text) throw `*Example: ${command} minecraft*`;
    try {
        const results = await search(text);
        if (!results.length) throw 'No results found';

        const data = await download(results[0].id);
        const developer = await getAppDeveloper(results[0].id);

        if (!data || !developer) throw 'Failed to fetch app data';

        const response = `
📲 *App Name:* ${data.name}
📦 *Package ID:* ${data.package}
🕒 *Last Update:* ${data.lastup}
💪 *Size:* ${data.size}
👨‍💼 *Developer:* ${developer.name}
🌐 *Developer Website:* ${developer.website}
`;

        await conn.sendMessage(m.chat, { image: { url: data.icon }, caption: response }, { quoted: m });

        // Download APK
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

handler.command = /^(testo)$/i;
handler.register = true;
handler.limit = 2;

export default handler;