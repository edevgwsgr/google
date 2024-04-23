import puppeteer from 'puppeteer-core';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    var regex = /^https?:\/\/play\.google\.com\/store\/apps\/details\?id=[a-zA-Z0-9.]+$/;

    if (!regex.test(args[0])) throw `Ex: ${usedPrefix + command} https://play.google.com/store/apps/details?id=com.linecorp.LGGRTHN`;

    let res = await appDl(args[0]);
    m.reply(wait);
    conn.sendMessage(m.chat, {
        document: {
            url: res.download
        },
        mimetype: res.mimetype,
        fileName: res.fileName
    }, {
        quoted: m
    });
}

handler.help = handler.alias = ['appdl'];
handler.tags = ['downloader'];
handler.command = /^(test7)$/i;

export default handler;

async function appDl(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://apk.support/gapi/index.php', { waitUntil: 'networkidle0' });

    await page.type('input[name="google_id"]', url);
    await page.click('button[type="submit"]');

    await page.waitForSelector('div.browser > div.dvContents > ul > li > a');
    const fileName = await page.evaluate(() => {
        return document.querySelector('div.browser > div.dvContents > ul > li > a').innerText.trim().split(' ')[0];
    });
    const downloadLink = await page.evaluate(() => {
        return document.querySelector('div.browser > div.dvContents > ul > li > a').href;
    });

    await browser.close();

    if (!downloadLink) throw 'Can\'t download the apk!';

    const response = await fetch(downloadLink, { method: 'HEAD' });
    const mimetype = response.headers.get('content-type');

    return {
        fileName,
        mimetype,
        download: downloadLink
    };
}