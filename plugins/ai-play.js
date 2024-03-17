import fetch from "node-fetch";
import yts from "yt-search";
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    let q, v, yt, dl_url, ttl, size, lolhuman, lolh, n, n2, n3, n4, cap, qu, currentQuality;
    if (!text) text = "fatiha";
    try {
        const yt_play = await search(text);
        let additionalText = '';
        if (command === 'play') {
            additionalText = '🔊 المشغل الآلي';
        } else if (command === 'rffewfw') {
            additionalText = '🎥 الفيديو الموسيقي';
        }
        let searchMessage = `═════ •⊰JEEN⊱• ═════\n`;
        searchMessage += `🔖 ${text}\n`;
        searchMessage += `🗣 ${yt_play[0].author.name}\n`;
        searchMessage += `🔊 ${additionalText}\n`;
        searchMessage += `═════ •⊰JEEN⊱• ═════\n`;
        
        // Add bot owner information, publication time, and a message indicating that the audio is being downloaded
        const botOwner = "Your Bot Owner";
        const currentTime = new Date().toLocaleString();
        const downloadingMessage = "يتم تحميل الصوت، الرجاء الانتظار...";
        searchMessage += `\n🤖 صاحب البوت: ${botOwner}\n`;
        searchMessage += `⏰ وقت النشر: ${currentTime}\n`;
        searchMessage += `💬 ${downloadingMessage}\n`;
        
        await conn.sendMessage(m.chat, {
            text: searchMessage,
            contextInfo: {
                externalAdReply: {
                    title: yt_play[0].title,
                    body: packname,
                    thumbnailUrl: yt_play[0].thumbnail, 
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m });
        
        if (command == 'play') {
            try {
                let q = '128kbps';
                let v = yt_play[0].url;
                const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
                const dl_url = await yt.audio[q].download();
                const ttl = await yt.title;
                const size = await yt.audio[q].fileSizeH;
                await conn.sendMessage(m.chat, { audio: { url: dl_url }, mimetype: 'audio/mpeg', contextInfo: {
                    externalAdReply: {
                        title: ttl,
                        body: "",
                        thumbnailUrl: yt_play[0].thumbnail, 
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }}, { quoted: m });
            } catch {
                // Handle error
            }
        }
        // Add more conditions for other commands like 'rffewfw' if needed
    } catch {
        // Handle error
    }
}

handler.command = ['play', 'rffewfw'];
handler.register = true;
handler.exp = 0;
handler.limit = 4;

export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "ar", gl: "ES", ...options });
    return search.videos;
}
