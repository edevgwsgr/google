import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command, sender }) => {
    if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' minecraft';
    let info = await apkinfo(text);
    let res = await apk(info.download, sender);

    await conn.sendMessage(m.chat, {
        image: { url: info.icon },
        caption: `*Name:* ${info.name}\n*Package:* ${info.packageN}\n*Download:* ${res.size}\n${res.fileName}`,
        footer: '_Apk files..._',
    });

    await conn.sendMessage(m.chat, {
        text: `Downloading ${info.name}...`,
    });

    await conn.sendMessage(
        m.chat,
        { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName },
        { quoted: m }
    );
};

handler.command = /^(apk4)$/i;
handler.help = ['apk'];
handler.tags = ['downloader'];
handler.premium = false;
export default handler;

async function apkinfo(url) {
    let res = await fetch('https://api.apkpure.com/v2/search?q=' + encodeURIComponent(url) + '&region=us');
    let data = await res.json();

    if (!data || !data.length) throw 'No results found for ' + url;

    let app = data[0];
    let name = app.title;
    let icon = app.icon;
    let packageN = app.package_name;
    let download = app.url;

    return { name, icon, packageN, download };
}

async function apk(url, sender) {
    let res = await fetch(url);
    let size = res.headers.get('Content-Length');

    if (!size) throw 'Can\'t determine the file size';

    if (parseInt(size) > 300 * 1024 * 1024) throw 'File size exceeds 300 MB limit!';

    let fileName = url.substring(url.lastIndexOf('/') + 1);
    let mimetype = res.headers.get('content-type');

    return { fileName, mimetype, download: url, size };
}