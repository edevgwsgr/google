import { search, download } from 'apkpure-scraper-v1';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command, sender }) => {
    if (!args[0]) throw 'مثال: ' + usedPrefix + command + ' minecraft';
    let info = await apkinfo(text);
    let res = await apk(text, sender);

    await conn.sendMessage(m.chat, {
        image: { url: info.icon },
        caption: `*الاسم:* ${info.name}\n*الباكج:* ${info.packageN}\n*التحميل:* ${res.size}\n${res.fileName}`,
        footer: '_ملفات apk..._',
    });

    await conn.sendMessage(m.chat, {
        text: `جاري التحميل ${info.name}...`,
    });

    await conn.sendMessage(
        m.chat,
        { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName },
        { quoted: m }
    );
};

handler.command = /^(apok)$/i;
handler.help = ['apk'];
handler.tags = ['downloader'];
handler.premium = false;
export default handler;

async function apkinfo(url) {
    let searchResults = await search(url);
    let firstResult = searchResults[0]; // Assuming the first search result is the one we want
    let icon = firstResult.icon;
    let name = firstResult.name;
    let packageN = firstResult.package;
    return { name, icon, packageN };
}

async function apk(url, sender) {
    let searchResults = await search(url);
    let firstResult = searchResults[0]; // Assuming the first search result is the one we want
    let downloadLink = await download(firstResult.id);
    let fileName = firstResult.name + '.apk';
    let download = downloadLink.url;
    let size = await getFileSize(download);

    let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');

    return { fileName, mimetype, download, size };
}

async function getFileSize(url) {
    let response = await fetch(url, { method: 'head' });
    let size = response.headers.get('content-length');
    return parseInt(size);
}