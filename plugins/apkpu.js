import axios from 'axios';
import cheerio from 'cheerio';

// Define a new scraping function for apkpure
async function scrapeApkPure(query) {
    try {
        // Fetch HTML content from apkpure search page
        const response = await axios.get(`https://apkpure.com/search?q=${query}`);
        const html = response.data;

        // Load HTML content into cheerio
        const $ = cheerio.load(html);

        // Parse the search results
        const results = [];

        $('div.search-dl.app_dl').each((index, element) => {
            const title = $(element).find('p.search-title a').text().trim();
            const developer = $(element).find('p.search-developer').text().trim();
            const rating = $(element).find('.rating').text().trim();
            const thumbnail = $(element).find('.search-icon img').attr('data-original');
            const link = $(element).find('p.search-title a').attr('href');

            results.push({ title, developer, rating, thumbnail, link });
        });

        return results;
    } catch (error) {
        throw new Error('Failed to fetch data from apkpure');
    }
}

let handler = async(m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'مثال:\n.apkpuresearch lite', m);

    await m.reply('جاري البحث...');

    try {
        const results = await scrapeApkPure(text);

        // Format the results into a string for display
        const formattedResults = results.map(result => (
            `${result.title}\n⌚ dev: ${result.developer}\n⏲️ rating: ${result.rating}\n👁️ thumb: ${result.thumbnail}\n📎 link: https://apkpure.com${result.link}`
        )).join("\n\n________________________\n\n");

        await m.reply(formattedResults);
    } catch (error) {
        console.error('Error fetching data:', error);
        await m.reply('حدث خطأ أثناء جلب البيانات.');
    }
};

handler.help = ['apkpuresearch'];
handler.tags = ['search'];
handler.command = /^(apkpu)$/i;
handler.owner = false;
handler.exp = 0;
handler.limit = false;

export default handler;