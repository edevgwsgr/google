import fetch from 'node-fetch'

let handler = async (m, { conn, args, text , usedPrefix, command }) => {
	if (!args[0]) throw 'Ex: '+usedPrefix + command+' minecraft'
	let res = await apk(text)
	await m.reply('_In progress, please wait..._')
	conn.sendMessage(m.chat, { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName }, { quoted: m })
}
handler.command = /^(obb)$/i;
handler.help = ['obb'];
handler.tags = ['downloader'];
handler.premium = true
export default handler;

async function apk(url) {
	let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(url)+'&limit=1')
	let $ = await res.json()
    let download = $.datalist.list[0].obb.main.path
	let fileName = download.replace(/https:\/\/pool.obb.aptoide.com\//,' ').match(/(\w*)\/(.*)/)[2].replace(/-/ig,'.')
	if (!download) throw 'Can\'t download the apk!'
	let icon = $.datalist.list[0].icon
	let mimetype = (await fetch(download, { method: 'head' })).headers.get('content-type')
	return { fileName, mimetype, download}
    }
