import { search, download, getAppDeveloper, getObbLink } from 'moddroid-scraper';

const handler = async (m, { conn, command, text }) => {
    if (!text) throw `*Ex: ${command} minecraft*`;
    try {
        const results = await search(text);
        if (!results.length) throw 'No results found';

        const data = await download(results[0].id);
        const developer = await getAppDeveloper(results[0].id);

        const response = `
📲 *App Name:* ${data.name}
📦 *Package ID:* ${data.package}
🕒 *Last Update:* ${data.lastup}
💪 *Size:* ${data.size}
👨‍💼 *Developer:* ${developer.name}
🌐 *Developer Website:* ${developer.website}
📧 *Developer Email:* ${developer.email}
`;

        await conn.sendMessage(m.chat, { image: { url: data.icon }, caption: response }, { quoted: m });

        // Download APK
        await conn.sendMessage(m.chat, { document: { url: data.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data.name + '.apk' }, { quoted: m });

        // Check if OBB file exists
        const obbLink = await getObbLink(results[0].id);
        if (obbLink) {
            // Download OBB file
            await conn.sendMessage(m.chat, { document: { url: obbLink }, mimetype: 'application/octet-stream', fileName: data.name + '.obb' }, { quoted: m });
        } else {
            console.log('No OBB file found for the app');
        }
    } catch (error) {
        console.error(error);
        throw 'An error occurred while processing the request.';
    }
};

handler.command = /^(test2)$/i;
handler.register = true;
handler.limit = 2;

export default handler;
