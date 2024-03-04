import fetch from "node-fetch";
import yts from "yt-search";
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    let q, v, yt, dl_url, ttl, size, lolhuman, lolh, n, n2, n3, n4, cap, qu, currentQuality, cnl;
    
    if (!text) {
        cnl = "whatsapp.com/channel/0029Va8dVNTGE56gO21d3a3c"; // Define cnl variable here with the appropriate value
        await conn.reply(m.chat, `*${usedPrefix + command} Los Cafres - Tus ojos*`, m, {
            contextInfo: {
                'forwardingScore': 200,
                'isForwarded': false,
                externalAdReply: {
                    showAdAttribution: false,
                    title: wm,
                    body: `Canal de WhatsApp`,
                    mediaType: 3,
                    sourceUrl: cnl,
                    thumbnail: imagen1
                }
            }
        }, { quoted: m });
    }
    
    try {
        const yt_play = await search(args.join(" "));
        let additionalText = '';
        if (command === 'play') {
            additionalText = '𝘼𝙐𝘿𝙄𝙊 🔊';
        } else if (command === 'rffewfw') {
            additionalText = '𝙑𝙄𝘿𝙀𝙊 🎥';
        }
        
        let captionvid = `ও 𝙏𝙄𝙏𝙇𝙀\n»  ${yt_play[0].title}`;
        
        await conn.sendMessage(m.chat, {
            text: captionvid,
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
                try {
                    const dataRE = await fetch(`https://api.akuari.my.id/downloader/youtube?link=${yt_play[0].url}`);
                    const dataRET = await dataRE.json();
                    await conn.sendMessage(m.chat, { audio: { url: dataRET.mp3[1].url }, mimetype: 'audio/mpeg', contextInfo: {
                        externalAdReply: {
                            title: yt_play[0].title,
                            body: "",
                            thumbnailUrl: yt_play[0].thumbnail, 
                            mediaType: 1,
                            showAdAttribution: true,
                            renderLargerThumbnail: true
                        }
                    }}, { quoted: m });   
                } catch {
                    try {
                        let humanLol = await fetch(`https://api.lolhuman.xyz/api/ytplay?apikey=${lolkeysapi}&query=${yt_play[0].title}`);
                        let humanRET = await humanLol.json();
                        await conn.sendMessage(m.chat, { audio: { url: humanRET.result.audio.link }, mimetype: 'audio/mpeg', contextInfo: {
                            externalAdReply: {
                                title: yt_play[0].title,
                                body: "",
                                thumbnailUrl: yt_play[0].thumbnail, 
                                mediaType: 1,
                                showAdAttribution: true,
                                renderLargerThumbnail: true
                            }
                        }}, { quoted: m });       
                    } catch {     
                        try {
                            let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${yt_play[0].url}`);    
                            let lolh = await lolhuman.json();
                            let n = lolh.result.title || 'error';
                            await conn.sendMessage(m.chat, { audio: { url: lolh.result.link}, mimetype: 'audio/mpeg', contextInfo: {
                                externalAdReply: {
                                    title: n,
                                    body: "",
                                    thumbnailUrl: yt_play[0].thumbnail, 
                                    mediaType: 1,
                                    showAdAttribution: true,
                                    renderLargerThumbnail: true
                                }
                            }}, { quoted: m });   
                        } catch {   
                            try {
                                let searchh = await yts(yt_play[0].url);
                                let __res = searchh.all.map(v => v).filter(v => v.type == "video");
                                let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
                                let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' });
                                await conn.sendMessage(m.chat, { audio: { url: ress.url }, mimetype: 'audio/mpeg', contextInfo: {
                                    externalAdReply: {
                                        title: __res[0].title,
                                        body: "",
                                        thumbnailUrl: yt_play[0].thumbnail, 
                                        mediaType: 1,
                                        showAdAttribution: true,
                                        renderLargerThumbnail: true
                                    }
                                }}, { quoted: m });   
                            } catch {}
                        }
                    }
                }
            }
        }  
        
        if (command == 'test') {
            try {
                let qu = '360';
                let q = qu + 'p';
                let v = yt_play[0].url;
                const yt = await youtubedl(v).catch(async _ => await youtubedlv2(v));
                const dl_url = await yt.video[q].download();
                const ttl = await yt.title;
                const size = await yt.video[q].fileSizeH;
                await await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `𝙏𝙄𝙏𝙇𝙀\n${ttl}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
            } catch {   
                try {  
                    let mediaa = await ytMp4(yt_play[0].url);
                    await conn.sendMessage(m.chat, { video: { url: mediaa.result }, fileName: `error.mp4`, caption: `_${wm}_`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: m });     
                } catch {  
                    try {
                        let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${yt_play[0].url}`);    
                        let lolh = await lolhuman.json();
                        let n = lolh.result.title || 'error';
                        let n2 = lolh.result.link;
                        let n3 = lolh.result.size;
                        let n4 = lolh.result.thumbnail;
                        await conn.sendMessage(m.chat, { video: { url: n2 }, fileName: `${n}.mp4`, mimetype: 'video/mp4', caption: `𝙏𝙄𝙏𝙇𝙀\n${n}`, thumbnail: await fetch(n4) }, { quoted: m });
                    } catch {}
                }
            }
        }
    } catch {
        handler.limit = 0;
    }
};

handler.command = ['play', 'test'];
handler.register = true;
handler.exp = 0;
handler.limit = 4;

export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
}

// Other functions (ytMp3, ytMp4, MilesNumber, secondString, bytesToSize) are assumed to be defined elsewhere in your code.
