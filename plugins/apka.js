const apkpure_scraper = require('apkpure-scraper-v1');

const handler = async (m, { conn, usedPrefix: prefix, command, text }) => {
  if (!text) throw '*[❗] يرجى إدخال اسم التطبيق الذي تريد البحث عنه.*';

  try {
    const searchResults = await apkpure_scraper.apkpure.all(text);
    if (searchResults.length === 0) {
      throw new Error('*[❗] لم يتم العثور على نتائج لبحثك.*');
    }

    const downloadResult = await apkpure_scraper.apkpure.detail(searchResults[0].url);

    let response = `*منزل التطبيق من ApkPure*\n\n*الاسم:* ${downloadResult.title}\n*الحزمة:* ${downloadResult.package_name}\n*الإصدار:* ${downloadResult.version}\n*الحجم:* ${downloadResult.size}`;
    await conn.sendMessage(m.chat, { image: { url: downloadResult.icon }, caption: response });

    if (parseInt(downloadResult.size.replace(' MB', '')) > 999) {
      throw new Error('*[⛔] الملف ثقيل جدًا لذا لن يتم إرساله.*');
    }

    await conn.sendMessage(m.chat, {
      document: {
        url: downloadResult.download_link,
        mimetype: 'application/vnd.android.package-archive',
        fileName: downloadResult.title + '.apk',
        caption: null
      }
    });
  } catch (error) {
    throw new Error(`*[❗] حدث خطأ: ${error.message}*`);
  }
};

handler.command = /^(apka)$/i;
handler.premium = true;

module.exports = handler;