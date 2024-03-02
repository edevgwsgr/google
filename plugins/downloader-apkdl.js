import { search, download } from 'aptoide-scraper';

const handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) throw `test`;

    try {
        const searchA = await search(text);
        const data5 = await download(searchA[0].id);

        let response = `Name : ${data5.name}\nPackage : ${data5.package}\nSize : ${data5.size}`;
        await conn.sendMessage(m.chat, response + "\n\n⏳ انتظر حتى يتم تنزيل التطبيق ...", m);

        if (data5.size.includes('GB') || parseFloat(data5.size.replace(' MB', '')) > 3000) {
            return await conn.sendMessage(m.chat, "تنبيه: حجم التطبيق كبير جدًا، قد يستغرق تنزيله بعض الوقت.", m);
        }

        await conn.sendFile(m.chat, data5.dllink, `${data5.name}.apk`, `📥 تم تنزيل التطبيق : ${data5.name}`);

    } catch (e) {
        await conn.reply(m.chat, `حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى لاحقًا.`, m);
        console.error(`❗❗ Error occurred in ${usedPrefix + command} ❗❗`);
        console.error(e);
    }
};

handler.command = /^(apkmod|modapk|dapk2|aptoide|aptoidedl)$/i;
handler.register = true;
handler.limit = 2;

export default handler;
