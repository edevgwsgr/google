import cheerio from 'cheerio';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    const regex = /^https?:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z0-9.]+$/;

    if (!regex.test(args[0])) throw `Example: ${usedPrefix + command} https://play.google.com/store/apps/details?id=com.linecorp.LGGRTHN`;

    try {
        const res = await appDl(args[0]);
        conn.sendMessage(m.chat, {
            document: {
                url: res.download
            },
            mimetype: res.mimetype,
            fileName: res.fileName
        }, {
            quoted: m
        });
    } catch (error) {
        throw `Error: ${error}`;
    }
};

handler.help = handler.alias = ['appdl'];
handler.tags = ['downloader'];
handler.command = /^(appdl)$/i;

export default handler;

async function appDl(url) {
    try {
        const res = await fetch('https://apk.support/gapi/index.php', {
            method: 'post',
            body: new URLSearchParams(Object.entries({
                x: 'downapk',
                t: 1,
                google_id: url,
                device_id: '',
                language: 'en-US',
                dpi: 480,
                gl: 'SUQ=',
                model: '',
                hl: 'en',
                de_av: '',
                aav: '',
                android_ver: 5.1,
                tbi: 'arm64-v8a',
                country: 0,
                gc: undefined
            }))
        });

        const $ = cheerio.load(await res.text());
        const fileName = $('div.browser > div.dvContents > ul > li > a').text().trim().split(' ')[0];
        const download = $('div.browser > div.dvContents > ul > li > a').attr('href');

        if (!download) throw 'Unable to retrieve the APK download link!';
        
        const mimetypeRes = await fetch(download, { method: 'head' });
        const mimetype = mimetypeRes.headers.get('content-type');
        
        return { fileName, mimetype, download };
    } catch (error) {
        throw `App download failed: ${error}`;
    }
}