import { apk, extractObbInfo } from './googleplay.js';

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