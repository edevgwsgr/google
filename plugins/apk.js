import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' minecraft';
  let info = await apkinfo(text);
  let res = await apk(text);

  await conn.sendMessage(m.chat, {
    image: { url: info.icon },
    caption: `*Name:* ${info.name}\n*Package:* ${info.packageN}\n*OBB:* ${info.obb_link}`,
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

  if (info.obb) {
    await conn.sendMessage(m.chat, {
      text: `Downloading OBB for ${info.name}...`,
    });

    let obbFile = await obb(text, conn);
    await conn.sendMessage(
      m.chat,
      { document: { url: obbFile.download }, mimetype: obbFile.mimetype, fileName: obbFile.fileName },
      { quoted: m }
    );
  }
};

handler.command = /^(apk2)$/i;
export default handler;

async function apkinfo(url) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + url + '&limit=1');
  let $ = await res.json();

  try {
    let icon = $.datalist.list[0].icon;
  } catch {
    throw 'Can\'t download the apk!';
  }

  let icon = $.datalist.list[0].icon;
  let name = $.datalist.list[0].name;
  let packageN = $.datalist.list[0].package;
  let download = $.datalist.list[0].file.path;
  let obb_link;
  let obb;

  try {
    obb_link = await $.datalist.list[0].obb.main.path;
    obb = true;
  } catch {
    obb_link = '_not available_';
    obb = false;
  }

  if (!download) throw 'Can\'t download the apk!';
  return { obb, obb_link, name, icon, packageN };
}

async function apk(url) {
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

async function obb(url, conn) {
    let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(url) + '&limit=1');
    let $ = await res.json();
    let download = $.datalist.list[0].obb.main.path;
    let fileName = download.replace(/https:\/\/pool.obb.aptoide.com\//, ' ').match(/(\w*)\/(.*)/)[2].replace(/-/ig, '.');
    if (!download) throw 'Can\'t download the apk!';

    // Check file size before downloading
    let fileSize = parseInt((await fetch(download, { method: 'head' })).headers.get('content-length'));
    if (fileSize > 3072 * 1024 * 1024) { // 80 MB
        throw 'File size exceeds the limit (3072 MB).';
    }

    let icon = $.datalist.list[0].icon;
    let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');
    return { fileName, mimetype, download };
}
