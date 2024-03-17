import fetch from "node-fetch";
import yts from "yt-search";
import ytdl from 'ytdl-core';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    // Check if text is empty
    if (!text) {
        return conn.reply(m.chat, `يرجى استخدام الأمر بالتالي: ${usedPrefix}${command} [اسم الأغنية]`, m)
    }
    
    try {
        const yt_play = await search(text);
        let additionalText = '';
        if (command === 'play') {
            additionalText = '🔊 المشغل الآلي';
        } else if (command === 'rffewfw') {
            additionalText = '🎥 الفيديو الموسيقي';
        }
        
        // Decorate the search message
        let decoratedSearchMessage = `🔍 بحث: ${text}\n`;
        decoratedSearchMessage += `🎤 الفنان: ${yt_play[0].author.name}\n`;
        decoratedSearchMessage += `🔊 ${additionalText}\n`;
        decoratedSearchMessage += '🇲🇦'; // Add Moroccan flag
        
        // Send the decorated search message
        await conn.sendMessage(m.chat, {
            text: decoratedSearchMessage,
            contextInfo: {
                externalAdReply: {
                    title: yt_play[0].title,
                    thumbnailUrl: yt_play[0].thumbnail, 
                    mediaType: 1,
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
                
                // Send the audio with a thumbnail
                await conn.sendFile(m.chat, dl_url, 'audio.mp3', null, m, { mimetype: 'audio/mpeg' });
                conn.reply(m.chat, 'تم تشغيل الأغنية 🎶', m);
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