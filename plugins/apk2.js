import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command, sender }) => {
    if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' <APK URL>';
    let res = await apk(text, sender);

    await conn.sendMessage(m.chat, {
        text: `Downloading APK...`,
    });

    await conn.sendMessage(
        m.chat,
        { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName },
        { quoted: m }
    );
};

handler.command = /^(apk2)$/i;
handler.help = ['apk <APK URL>'];
handler.tags = ['downloader'];
handler.premium = false;
export default handler;

async function apk(url, sender) {
    let fileName = url.substring(url.lastIndexOf('/') + 1); // Extract file name from URL
    let download = url;
    let size = (await fetch(download, { method: 'head' })).headers.get('Content-Length');

    if (!size) throw 'Can\'t download the APK!';
    // Remove the size limit check to allow downloading files larger than 10 GB
    let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');

    return { fileName, mimetype, download, size };
}