import fetch from 'node-fetch';

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  if (!args[0]) throw 'Ex: ' + usedPrefix + command + ' minecraft';
  let res = await apk(text);

  m.react(rwait);

  await conn.sendMessage(m.chat, {
    text: `Downloading ${res.fileName}...`,
  });

  await conn.sendMessage(
    m.chat,
    { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName },
    { quoted: m }
  );
};

handler.command = /^(apk2)$/i;
handler.help = ['apk'];
handler.tags = ['downloader'];
handler.premium = true;
handler.group = false;
export default handler;

async function apk(url) {
  let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(url) + '&limit=1');
  let $ = await res.json();
  
  let packageN = $.datalist.list[0].package;
  let download = $.datalist.list[0].file.path;
  let icon = $.datalist.list[0].icon;
  let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type');
  
  // Check if the file extension is APK
  if (!download.endsWith('.apk')) throw 'Can\'t download the apk!';

  // Get the file size
  let size = (await fetch(download, { method: 'head' })).headers.get('Content-Length');

  if (!download) throw 'Can\'t download the apk!';

  let fileName = packageN + '.apk';

  return { fileName, mimetype, download, size };
}
