import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'
import { readFileSync } from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
    let { exp, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)

    if (!canLevelUp(level, exp, global.multiplier)) {
        let remainingXP = max - exp
        throw `
╭─ ❖ ── *المستوى* ── ❖ ──╗
┃ *الاسم:* ${conn.getName(m.sender)}
┃ *المستوى:* ${level}
┃ *الرتبة:* ${role}
┃ *نقاط التجربة:* ${exp - min}/${xp}
╰─ ❖ ── ✦ ── ✦ ── ❖ ──╝

*تحتاج ${remainingXP} نقاط تجربة إضافية للارتقاء إلى المستوى التالي.*
`.trim()
    }

    let before = level
    while (canLevelUp(level, exp, global.multiplier)) level++

    if (before !== level) {
        let str = `
╭─ ❖ ── *الارتقاء بالمستوى* ── ❖ ──╗
┃ *المستوى السابق:* ${before}
┃ *المستوى الحالي:* ${level}
┃ *الرتبة:* ${role}
┃ *التاريخ:* ${new Date().toLocaleString('id-ID')}
╰─ ❖ ── ✦ ── ✦ ── ❖ ──╝

*تهانينا! ${conn.getName(m.sender)} قد ارتقى بمستواه.*
*_كلما تفاعلت أكثر مع KatashiBot-MD، زاد مستواك!_* 
*_قم بتحديث رتبتك باستخدام الأمر ${usedPrefix}rol._*
`.trim()

        try {
            const img = readFileSync('levelup.jpg') // قراءة ملف الصورة
            conn.sendMessage(m.chat, { image: img, caption: str }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 })
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['xp']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.exp = 0

export default handler
