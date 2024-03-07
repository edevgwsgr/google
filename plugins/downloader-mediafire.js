import { lookup } from 'mime-types'
import { mediafiredl } from '@bochilteam/scraper'

let handler = async (m, { conn, args }) => {
	if (!args[0]) throw 'Input URL' 
	if (!/https?:\/\/(www\.)?mediafire\.com/.test(args[0])) throw 'Invalid URL' 
	let url = args[0].replace(/^https?:\/\//i, '') // Remove https:// or http:// from the beginning
	let res = await mediafiredl("https://" + url) // Prepend https:// to the modified URL
	let mimetype = await lookup(res.url)
	delete res.url2
	m.reply(Object.keys(res).map(v => `*• ${v.capitalize()}:* ${res[v]}`).join('\n') + '\n\n_Sending file..._')
	conn.sendMessage(m.chat, { document: { url: res.url }, fileName: res.filename, mimetype }, { quoted: m })
}
handler.help = handler.alias = ['mediafire']
handler.tags = ['downloader']
handler.command = /^(mediafire)$/i
//handler.register = true
export default handler

