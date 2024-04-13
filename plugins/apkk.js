import fetch from 'node-fetch';
const apkpure_scraper = require('apkpure-scraper-v1');

let handler = async (m, { conn, args, text, usedPrefix, command, sender }) => {
    if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' minecraft';

    let apkInfo;
    try {
        apkInfo = await apkinfoFromApkPure(text);
    } catch (error) {
        console.error('Error fetching APK info from ApkPure:', error);
        throw 'Error fetching APK info from ApkPure';
    }

    let apkDetails;
    try {
        apkDetails = await apkDetailsFromAptoide(text, sender);
    } catch (error) {
        console.error('Error fetching APK details from Aptoide:', error);
        throw 'Error fetching APK details from Aptoide';
    }

    await conn.sendMessage(m.chat, {
        image: { url: apkInfo.icon },
        caption: `*Name:* ${apkInfo.name}\n*Package:* ${apkInfo.packageN}\n*Download:* ${apkDetails.size}\n${apkDetails.fileName}`,
        footer: '_Apk files..._',
    });

    await conn.sendMessage(m.chat, {
        text: `Downloading ${apkInfo.name}...`,
    });

    await conn.sendMessage(
        m.chat,
        { document: { url: apkDetails.download }, mimetype: apkDetails.mimetype, fileName: apkDetails.fileName },
        { quoted: m }
    );
};

handler.command = /^(apkk)$/i;
handler.help = ['apk'];
handler.tags = ['downloader'];
handler.premium = false;
export default handler;

async function apkinfoFromApkPure(query) {
    try {
        const result = await apkpure_scraper.apkpure.all(query);
        return {
            name: result[0].title,
            icon: result[0].icon,
            packageN: result[0].packageName
        };
    } catch (error) {
        throw error;
    }
}

async function apkDetailsFromAptoide(query, sender) {
    try {
        let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(query) + '&limit=1');
        let $ = await res.json();
        let fileName = $.datalist.list[0].package + '.apk';
        let download = $.datalist.list[0].file.path;
        let size = (await fetch(download, { method: 'head' })).headers.get('Content-Length');

        if (!download || !size) throw 'Can\'t download the APK!';
        if (parseInt(size) > 300 * 1024 * 1024) throw 'File size exceeds 300 MB limit!';

        let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');

        return { fileName, mimetype, download, size };
    } catch (error) {
        throw error;
    }
}