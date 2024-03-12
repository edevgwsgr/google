let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `${mg}*Incorrect report*\n\n*EXAMPLE:*\n*${usedPrefix + command} the command ${usedPrefix}infobot does not work.*\n\n*Write the report*\n\n*EXAMPLE:*\n*${usedPrefix + command} the command ${usedPrefix}owner does not work.*`

    if (text.length < 10) throw `${fg} ✨ *Minimum 10 characters to make the Report.*\n\n✨ *Minimum 10 characters to make the Report.*`

    if (text.length > 1000) throw `${fg} 😼 *Maximum 1000 characters to make the Report.*\n\n😼 *Maximum 1000 characters to make the Report.*`

    let teks = `*╭━━[ REPORT | REQUEST ]━━━⬣*\n*┃*\n*┃* *SENDER | NUMBER*\n┃ ✦ Wa.me/${m.sender.split`@`[0]}\n*┃*\n*┃* *MESSAGE | REPORT*\n*┃* ✦ ${text}\n*┃*\n*╰━━━━━━━━━━━━━━━━━━⬣*`

    conn.reply('212621851554@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, {
        contextInfo: {
            mentionedJid: [m.sender]
        }
    })

    m.reply(`｟ *EXIT | SUCCESS* ｠\n\n*The report has been sent to my Creator. You will receive a response soon. If it is false, the report will be ignored.*`)
}

handler.help = ['report', 'request'].map(v => v + ' <text>')
handler.tags = ['info']
handler.command = /^(report|request|bug|report-owner|reports|report)$/i 
handler.register = true
export default handler

