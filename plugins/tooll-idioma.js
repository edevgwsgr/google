import translate from '@vitalets/google-translate-api'
import { es, en, id, ar, pt } from '../lib/idiomas/total-idiomas.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

    let texto = `*Idioma de GataBot cambiado Correctamente:* `
    let idioma = await translate(`${texto}`, { to: args[0], autoCorrect: true })

    try {
        if (args[0] == 'es') {
            global.lenguajeGB = es
            await conn.sendMessage(m.chat, lenguajeGB['smsAvisoEG']() + idioma.text + '\n' + 'დ ```Español```', null, { quoted: fkontak })
        } else if (args[0] == 'en') {
            global.lenguajeGB = en
            await conn.sendMessage(m.chat, lenguajeGB['smsAvisoEG']() + idioma.text + '\n' + 'დ ```English```', null, { quoted: fkontak })
        } else if (args[0] == 'id') {
            global.lenguajeGB = id
            await conn.sendMessage(m.chat, lenguajeGB['smsAvisoEG']() + idioma.text + '\n' + 'დ ```Bahasa Indonesia```', null, { quoted: fkontak })
        } else if (args[0] == 'ar') {
            global.lenguajeGB = ar
            await conn.sendMessage(m.chat, lenguajeGB['smsAvisoEG']() + idioma.text + '\n' + 'დ ```عرب```', null, { quoted: fkontak })
        } else if (args[0] == 'pt') {
            global.lenguajeGB = pt
            await conn.sendMessage(m.chat, lenguajeGB['smsAvisoEG']() + idioma.text + '\n' + 'დ ```Português```', null, { quoted: fkontak })
        } else {
            await m.reply(`Idioma no válido. Utiliza uno de los siguientes: es, en, id, ar, pt`)
        }
    } catch (e) {
        await m.reply(`${fg}\`\`\`NO SE LOGRÓ CAMBIAR DE IDIOMA, REPORTE ESTE COMANDO ${usedPrefix + command} CON EL COMANDO ${usedPrefix}reporte\`\`\``)
        console.log(e)
    }
}

handler.command = /^(idioma|languaje|idiomas|languajes|languages)$/i
handler.owner = true

export default handler

