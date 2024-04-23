import puppeteer from 'puppeteer';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!text) throw 'Ex: ' + usedPrefix + command + ' https://play.google.com/store/apps/details?id=com.facebook.lite';
    try {
        await m.reply('*LOADING…*');

        const packageName = text.match(/id=(\S+)/)[1];

        const result = await apk(text);
        
        await conn.sendMessage(m.chat, {
            image: { url: result.imageURL },
            caption: `*Name:* ${result.appName}\n*LastUpdate:* ${result.appVersion}\n*Package:* ${packageName}\n*Developer:* ${result.appDeveloper}`,
            footer: '_APK files..._',
        });
        
        await m.reply(`UPLOADING : *${result.appName}*`);

        const apkFileName = `${packageName}.${result.appFormat}`;
        const apkMimetype = (await fetch(result.downloadLink, { method: 'head' })).headers.get('content-type');
        
        await conn.sendMessage(
            m.chat,
            { document: { url: result.downloadLink }, mimetype: apkMimetype, fileName: apkFileName },
            { quoted: m }
        );

        if (result.obbLink) {
            await m.reply(`UPLOADING OBB : *${result.appName}*`);
            const obbFileName = `${result.obbFileName}`;
            const obbMimetype = (await fetch(result.obbLink, { method: 'head' })).headers.get('content-type');
            
            await conn.sendMessage(
                m.chat,
                { document: { url: result.obbLink }, mimetype: obbMimetype, fileName: obbFileName },
                { quoted: m }
            );
        }
    } catch (error) {
        await m.reply('Can\'t download the apk!');
    }
}

handler.command = /^(apkdl)$/i;
handler.help = ['apkdl'];
handler.tags = ['downloader'];
export default handler;

async function apk(packageName) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');

    await page.goto('https://apk.support/apk-downloader');

    await page.waitForSelector('#region-package');
    await page.type('#region-package', packageName);

    await page.click('#apksubmit');

    await page.waitForSelector('.appinfo_i');

    const { appName, appVersion, appDeveloper } = await page.evaluate(() => ({
        appName: document.querySelector('.appinfo_title a').textContent,
        appVersion: document.querySelector('.appinfo_vd').textContent,
        appDeveloper: document.querySelector('.appinfo_dev').textContent
    }));

    const downloadLink = await page.$eval('.bdlinks a', el => el.href);
    const imageURL = await page.$eval('.appinfo_icon img', el => el.src);

    const obbInfo = await extractObbInfo(page);

    await browser.close();

    return {
        appName,
        appVersion,
        appDeveloper,
        downloadLink,
        appSize: obbInfo ? obbInfo.size : 'Not available',
        obbLink: obbInfo ? obbInfo.link : null,
        obbFileName: obbInfo ? obbInfo.fileName.replace('⚡', '') : null,
        imageURL,
        appFormat: 'apk'
    };
}

async function extractObbInfo(page) {
    const obbElement = await page.$('.bdlinks a[href*=".obb"]');
    if (!obbElement) return null;

    const obbLink = await obbElement.evaluate(el => el.href);
    const obbFileName = await obbElement.evaluate(el => el.querySelector('.der_name').textContent.trim());
    const obbSize = await obbElement.evaluate(el => el.querySelector('.der_size').textContent.trim());

    return {
        link: obbLink,
        fileName: obbFileName,
        size: obbSize
    };
}