import puppeteer from 'puppeteer';
import fetch from 'node-fetch';

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
handler.command = /^(test1)$/i;

export default handler;

async function appDl(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://apk.support/apk-downloader', { waitUntil: 'networkidle0' });

    await page.waitForSelector('input[name="q"]');
    await page.type('input[name="q"]', url);
    await page.click('button[type="submit"]');

    await page.waitForSelector('div[role="alert"]');
    const alertText = await page.evaluate(() => {
        return document.querySelector('div[role="alert"]').innerText;
    });

    if (alertText.includes('not found')) {
        throw 'App not found!';
    }

    await page.waitForSelector('a[data-action="download"]');
    const downloadLink = await page.evaluate(() => {
        return document.querySelector('a[data-action="download"]').href;
    });

    await browser.close();

    if (!downloadLink) throw 'Can\'t download the apk!';

    const response = await fetch(downloadLink, { method: 'HEAD' });
    const mimetype = response.headers.get('content-type');

    return {
        fileName: 'app.apk',
        mimetype,
        download: downloadLink
    };
}