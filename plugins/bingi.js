import puppeteer from 'puppeteer-core';

let handler = async (m, { conn, text }) => {
    if (!text) throw 'What do you want to create?';
    m.react('⌛');
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.bing.com/images/create?q=${encodeURIComponent(text)}`);
    
    // Set viewport size
    await page.setViewport({ width: 1920, height: 1080 });

    // Wait for any animations or loading to complete
    await page.waitForTimeout(3000);

    // Take a screenshot of the page
    const screenshot = await page.screenshot({ fullPage: true });

    // Close the browser
    await browser.close();

    // Send image
    conn.sendFile(m.chat, screenshot, 'image.png', `${text}`, m);
    m.react('✅');
}

handler.help = ['createimg <text>'];
handler.tags = ['AI'];
handler.command = /^bingi$/i;

export default handler;
