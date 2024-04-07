import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command, sender }) => {
  if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' minecraft';
  let info = await apkinfo(text);
  let res = await apk(text, sender);

  await conn.sendMessage(m.chat, {
    image: { url: info.icon },
    caption: `*Name:* ${info.name}\n*Package:* ${info.packageN}\n*Download:* ${res.size}\n${res.fileName}`,
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

  if (!sender.startsWith('0')) { // Check if not the bot developer
    setTimeout(() => {
      delete downloading[sender];
    }, 5 * 60 * 1000); // 5 minutes
  }
};

handler.command = /^(apk)$/i;
handler.help = ['apk'];
handler.tags = ['downloader'];
handler.premium = false;
export default handler;

const downloading = {};

async function apkinfo(url) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + url + '&limit=1');
  let $ = await res.json();

  let icon = $.datalist.list[0].icon;
  let name = $.datalist.list[0].name;
  let packageN = $.datalist.list[0].package;
  let download = $.datalist.list[0].file.path;

  if (!download) throw 'Can\'t download the apk!';
  return { name, icon, packageN };
}

async function apk(url, sender) {
  if (downloading[sender]) throw 'You can\'t download another file right now. Please wait for 5 minutes.';
  
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(url) + '&limit=1');
  let $ = await res.json();
  let fileName = $.datalist.list[0].package + '.apk';
  let download = $.datalist.list[0].file.path;
  let size = (await fetch(download, { method: 'head' })).headers.get('Content-Length');

  if (!download || !size) throw 'Can\'t download the apk!';
  if (parseInt(size) > 300 * 1024 * 1024) throw 'File size exceeds 300 MB limit!';

  downloading[sender] = true; // Mark the sender as downloading

  let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');

  return { fileName, mimetype, download, size };
}
