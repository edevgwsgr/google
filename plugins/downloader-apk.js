import fetch from 'node-fetch';

async function apkinfo(url) {
  let res = await fetch('https://achieved-ember-drug.glitch.me/search?platform=aptoide&app_name=' + encodeURIComponent(url));
  let searchData = await res.json();

  if (!searchData.length) {
    throw `لم يتم العثور على التطبيق "${url}" :/`;
  }

  let appInfo = searchData[0];
  let name = appInfo.name;
  let packageN = appInfo.id;

  return { name, packageN };
}

async function apk(url) {
  let res = await fetch('https://achieved-ember-drug.glitch.me/download?platform=aptoide&app_url=' + encodeURIComponent(url));
  let downloadInfo = await res.json();

  let link = downloadInfo.link;
  let developer = downloadInfo.developer;
  let size = downloadInfo.size;
  let img = downloadInfo.img;

  let fileName = `${downloadInfo.id}.apk`;

  return { link, developer, size, img, fileName };
}

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' minecraft\n\n by instagram.com/ang_0y';
  if (text.toLowerCase().includes("whatsapp")) {
    return conn.reply(m.chat, 'هل تتحدث الآن معي من تويتر أم أنت غبي؟', m);
  }
  let info = await apkinfo(text);
  let res = await apk(text);

  const MAX_ALLOWED_SIZE_BYTES = 3072 * 1024 * 1024; // 250MB in bytes

  if (res.size > MAX_ALLOWED_SIZE_BYTES) {
    throw 'apk by instagram.com/ang_0y/\n\nThe apk file is too large. Maximum download size is 3072MB.';
  }

  await conn.reply(m.chat, 'apk by instagram.com/ang_0y/\n\nSearching for the application...');
  const { name, packageN } = info;
  const { img, link, developer, size, fileName } = res;

  await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: `apk by instagram.com/ang_0y/\n*Name :* ${name}\n*Package* : ${packageN}\n*Developer* : ${developer}`,
  }, 'extendedTextMessage', { quoted: m });

  const appRes = await fetch(link);
  const appBuffer = await appRes.buffer();

  conn.reply(m.chat, 'apk by instagram.com/ang_0y/\n\nsending app…', m);
  conn.sendFile(m.chat, appBuffer, `${packageN}.apk`, null, m, false, { mimetype: 'application/vnd.android.package-archive' });
};

handler.help = ['apk'];
handler.tags = ['downloader'];
handler.command = /^(apk)$/i;
export default handler;
