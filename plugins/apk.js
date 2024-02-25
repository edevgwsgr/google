import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' minecraft';

  let info = await apkinfo(text);
  let apkRes = await apk(text, conn);

  await conn.sendMessage(m.chat, {
    image: { url: info.icon },
    caption: `*Name:* ${info.name}\n*Package:* ${info.packageN}`,
    footer: '_Apk files..._',
  });

  await m.reply(`_Downloading APK (${info.name}), please wait..._`);
  await conn.sendMessage(
    m.chat,
    { document: { url: apkRes.download }, mimetype: apkRes.mimetype, fileName: apkRes.fileName },
    { quoted: m }
  );

  if (info.obb) {
    await m.reply('_Sending OBB, please wait..._');
    await conn.sendMessage(m.chat, { document: { url: info.obb_link }, mimetype: 'application/octet-stream', fileName: `${info.packageN}.obb` }, { quoted: m });
  }
};

handler.command = /^(apk2)$/i;
handler.help = ['apk2'];
handler.tags = ['downloader'];
handler.premium = false;

export default handler;

async function apkinfo(url) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + url + '&limit=1');
  let $ = await res.json();

  try {
    let icon = $.datalist.list[0].icon;
    let name = $.datalist.list[0].name;
    let packageN = $.datalist.list[0].package;
    let obb_link;
    let obb;

    try {
      obb_link = $.datalist.list[0].obb.main.path;
      obb = true;
    } catch {
      obb_link = '_not available_';
      obb = false;
    }

    if (!download) throw 'Can\'t download the apk!';
    return { obb, obb_link, name, icon, packageN };
  } catch {
    throw 'Can\'t download the apk!';
  }
}

async function apk(url, conn) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(url) + '&limit=1');
  let $ = await res.json();
  let fileName = $.datalist.list[0].package + '.apk';
  let download = $.datalist.list[0].file.path;
  let size = (await fetch(download, { method: 'head' })).headers.get('Content-Length');
  if (!download) throw 'Can\'t download the apk!';
  let icon = $.datalist.list[0].icon;
  let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');

  return { fileName, mimetype, download, size };
}
