import db from '../lib/database.js'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import can from 'knights-canvas'
import uploadImage from '../lib/uploadImage.js'
import { ranNumb, padLead } from '../lib/others.js'
import got from 'got'

const levelRoles = {
    2: 'Newbie ㋡',
    4: 'Beginner Grade 1 ⚊¹',
    6: 'Beginner Grade 2 ⚊²',
    // Add more levels and roles as needed
    // Format: level: 'Role'
}

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let name = await conn.getName(m.sender)
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let image, data, pp, out
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = `Level *${user.level} (${user.exp - min}/${xp})*\nKurang *${max - user.exp}* Lagi!`
        let meh = padLead(ranNumb(43), 3)
        try {
            try { pp = await conn.profilePictureUrl(m.sender, 'image') }
            catch { pp = 'https://i.ibb.co/m53WF9N/avatar-contact.png' }
            let out = 'https://telegra.ph/file/6894577305375f8139e3a.jpg'
            image = await new can.Rank().setAvatar(pp).setUsername(name.replaceAll('\n','')).setBg(out).setNeedxp(xp).setCurrxp(user.exp - min).setLevel(user.level).setRank('https://i.ibb.co/Wn9cvnv/FABLED.png').toAttachment()
            data = await image.toBuffer()
            await conn.sendMessage(m.chat, { image: data, caption: txt }, { quoted : m })
        } catch (e) {
            console.log(e)
            m.reply(txt)
        }
    } else {
        let before = user.level * 1
        while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
        let role = getRole(user.level)
        user.role = role || user.role
        if (before !== user.level) {
            let txt = `Selamat ${name.replaceAll('\n','')} Naik Level\n• Level Sebelumnya : ${before}\n• Level Baru : ${user.level}\n• Pada Jam : ${new Date().toLocaleString('id-ID')}\n*_Semakin Sering Berinteraksi Dengan Lia Semakin Tinggi Level Kamu_*`
            try {
                let image, data, pp
                try { pp = await conn.profilePictureUrl(m.sender, 'image') }
                catch { pp = 'https://i.ibb.co/m53WF9N/avatar-contact.png' }
                image = await new can.Up().setAvatar(pp).toAttachment()
                data = await image.toBuffer()
                await conn.sendMessage(m.chat, { image: data, caption: txt }, { quoted : m })
            } catch (e) {
                console.log(e)
                m.reply(txt)
            }
        }
    }
}

handler.menufun = ['levelup']
handler.tagsfun = ['main']
handler.command = /^(level)$/i

export default handler

function getRole(level) {
    for (let lvl in levelRoles) {
        if (level <= lvl) {
            return levelRoles[lvl]
        }
    }
    return 'Legends 忍' // Default role for high levels
}
