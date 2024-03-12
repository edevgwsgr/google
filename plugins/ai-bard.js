import fetch from 'node-fetch'

var handler = async (m, { text,  usedPrefix, command }) => {

if (!text) throw `INGRESE UN TEXT!`

try {
var apii = await fetch(`https://aemt.me/bard?text=${text}`)
var res = await apii.json()
await m.reply(res.result)

} catch (error) {
console.error(error)
throw 'OCURRIÓ UN ERROR'
}

}
handler.command = ['bard']
handler.help = ['bard']
handler.tags = ['herramientas']
handler.register = true;

handler.premium = true

export default handler