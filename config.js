import { watchFile, unwatchFile } from 'fs';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';
import { en, es, id, ar, pt } from './lib/idiomas/total-idiomas.js';

global.owner = [
  ['212641207087', '𝙊𝙬𝙣𝙚𝙧', true], // owner
  ['212705776824', '𝘼𝙨𝙞𝙨𝙩𝙚𝙣𝙘𝙞𝙖', true],
  ['212641207087', 'Develooper', true]
];

global.mods = ['212641207087', '212705776824'];
global.prems = ['212641207087', '212705776824'];

global.lenguajeGB = en;

global.openai_key = 'sk-0';
global.openai_org_id = 'org-3';

global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f'];
global.keysxxx = global.keysZens[Math.floor(Math.random() * global.keysZens.length)];
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63'];
global.keysxteam = global.keysxteammm[Math.floor(Math.random() * global.keysxteammm.length)];
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5'];
global.keysneoxr = global.keysneoxrrr[Math.floor(Math.random() * global.keysneoxrrr.length)];
global.lolkeysapi = 'GataDios';
global.itsrose = ['4b146102c4d500809da9d1ff'];
global.baileys = '@whiskeysockets/baileys';

global.APIs = { 
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://api.zahwazein.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',  
  fgmods: 'https://api-fgmods.ddns.net',
  botcahx: 'https://api.botcahx.biz.id',
  ibeng: 'https://api.ibeng.tech/docs', 
  rose: 'https://api.itsrose.site',
  popcat : 'https://api.popcat.xyz',
  xcoders : 'https://api-xcoders.site'
};

global.APIKeys = { 
  'https://api.xteam.xyz': global.keysxteam,
  'https://api.lolhuman.xyz': global.lolkeysapi,
  'https://api.neoxr.my.id': global.keysneoxr,  
  'https://violetics.pw': 'beta',
  'https://api.zahwazein.xyz': global.keysxxx,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren'
};

global.mods = []; 
global.cheerio = cheerio;
global.fs = fs;
global.fetch = fetch;
global.axios = axios;
global.moment = moment;

global.packname = 'MEE5';
global.author = 'MD';

global.wait = "_*Please wait...*_";
global.waitt = "_*Please wait..*_";
global.waittt = "_*Please wait.*_";
global.waitttt = "_*Please wait*_";

global.official = [ 
  ['212621851554', 'test', 1], 
  ['212641207087', 'test', 1],  
  ['59894808483', 'test', 1],
  ['5521989092076', 'test', 1]
];

global.mail = 'support@mee6.ai';
global.desc = '';
global.desc2 = '';
global.country = 'moroco';

global.vs = '1.5.2 (beta)';
global.vsJB = '4.5 (Beta)';

global.wait = "*Charging..._ ▬▭▭▭▭▭▭*";
global.waitt = "*Charging..._ ▬▬▭▭▭*";
global.waittt = "*Charging..._ ▬▬▬▬▭▭*";
global.waitttt = "*Charging..._ ▬▬▬▬▬▬▭*";
global.waittttt = "*Filled..._ ▬▬▬▬▬▬▬*";

global.gt = 'MEE5';
global.yt = 'youtube.com/';
global.yt2 = 'youtu.be/';
global.ig = 'instagram.com/majnon._.98';
global.md = 'chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be';
global.fb = 'https://www.facebook.com/jamaa.abdessamad';

global.thumbnailUrl = [
  'https://telegra.ph/file/81260a8b9e8cff26d2b48.jpg', 
  'https://telegra.ph/file/ac4928f0824a2a0492737.jpg',
  'https://telegra.ph/file/dcd2c29b6e8268235ab01.jpg', 
  'https://telegra.ph/file/d43c89a5d2da72875ec05.jpg',
  'https://telegra.ph/file/7d6c0e35f9c8f52715541.jpg', 
  'https://telegra.ph/file/ef4b742d47e6a9115e2ff.jpg',
  'https://telegra.ph/file/81260a8b9e8cff26d2b48.jpg', 
  'https://telegra.ph/file/af236598456b95884bd15.jpg',
  'https://telegra.ph/file/de92ed4a729887ffc974c.jpg', 
  'https://telegra.ph/file/00ce42a193b1dbbf907d4.jpg'
];

global.nna = 'https://whatsapp.com/channel/0029Va8dVNTGE56gO21d3a3c'; 
global.nn2 = 'HJvDM8zYgsIKu0hMW3i5be'; 
global.nna2 = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be'; 
global.nn = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be'; 
global.nnn = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be'; 
global.nnnt = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be'; 
global.nnntt = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be'; 
global.nnnttt = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be'; 
global.nnnttt1 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r'; 
global.nnnttt2 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r'; 
global.nnnttt3 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r'; 
global.nnnttt4 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r'; 
global.nnnttt5 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r'; 
global.paypal = 'https://paypal.me/majnonrossi'; 
global.asistencia = 'Wa.me/212641207087';

global.wm = 'MEE5-MD';
global.igfg = 'MEE5-MD';
global.nomorown = global.owner[0][0];

global.imagen1 = fs.readFileSync('./media/menus/Menu3.jpg');
global.imagen2 = fs.readFileSync('./media/menus/img1.jpg');
global.imagen3 = fs.readFileSync('./media/menus/img2.jpg');
global.imagen4 = fs.readFileSync('./media/menus/img3.jpg');
global.imagen5 = fs.readFileSync('./media/menus/img4.jpg');
global.imagen6 = fs.readFileSync('./media/menus/img5.jpg');
global.imagen7 = fs.readFileSync('./media/menus/img6.jpg');
global.imagen8 = fs.readFileSync('./media/menus/img7.jpg');
global.imagen9 = fs.readFileSync('./media/menus/img8.jpg');
global.imagen10 = fs.readFileSync('./media/menus/img9.jpg');
global.imagen11 = fs.readFileSync('./media/menus/img10.jpg');
global.imagen12 = fs.readFileSync('./media/menus/img11.jpg');
global.imagen13 = fs.readFileSync('./media/menus/img12.jpg');

global.img = 'https://i.imgur.com/AwlL9kc.jpeg';
global.img2 = 'https://i.imgur.com/p18q1Ok.jpeg';
global.img3 = 'https://i.imgur.com/01Z8a0a.jpg'; 
global.img5 = 'https://i.imgur.com/80uz37R.jpeg';
global.img6 = 'https://i.imgur.com/3zSvnGY.jpeg';
global.img7 = 'https://i.imgur.com/WY4r6up.jpeg';
global.img8 = 'https://i.imgur.com/qCO3RYa.jpeg';
global.img9 = 'https://i.imgur.com/dWk51FS.jpeg';
global.img10 = 'https://i.imgur.com/T4NjKMi.jpeg';
global.img11 = 'https://i.imgur.com/jqyWSlh.jpeg';
global.img12 = 'https://i.imgur.com/mpCRttm.jpeg';
global.img13 = 'https://i.imgur.com/O04epJI.jpeg';
global.img14 = 'https://i.imgur.com/jfbuJRU.jpeg';
global.img15 = 'https://i.imgur.com/DzqUXkW.jpeg';
global.img17 = 'https://i.imgur.com/Y3ZWq7z.jpeg';
global.img18 = 'https://i.imgur.com/kaUN1Nz.jpeg';
global.img19 = 'https://i.imgur.com/7yJ22hJ.jpeg';
global.img20 = 'https://i.imgur.com/qcD353P.jpeg';
global.img21 = 'https://i.imgur.com/3fJTaX6.jpeg';
global.img21 = 'https://i.imgur.com/akofqcE.jpeg'; 

global.welgata = [global.ig, global.yt2, global.yt2, global.ig, global.md, global.ig, global.yt, global.paypal, global.yt2, global.yt2, global.ig, global.fb];
global.redesMenu = [global.nna, global.nn2, global.nn, global.nnn, global.nnnt, global.nnntt, global.nnnttt, global.nnnttt1, global.nnnttt2, global.nnnttt3, global.nnnttt4, global.md, global.ig, global.paypal, global.yt, global.asistencia, global.fb];
global.gataMenu = [global.img, global.img2, global.img6, global.img7, global.img8, global.img9, global.img13, global.img14, global.img15, global.img17, global.img18, global.img19, global.img20, global.img21];
global.gataImg = [global.imagen1, global.imagen2, global.imagen3, global.imagen4, global.imagen5, global.imagen6, global.imagen7, global.imagen8, global.imagen9, global.imagen10, global.imagen11, global.imagen12, global.imagen13];

global.htki = '*⭑•̩̩͙⊱•••• ☪*';
global.htka = '*☪ ••••̩̩͙⊰•⭑*';
global.htjava = '⫹⫺';
global.correct = '✅';
global.fault = '💔';
global.alert = '⚠️';
global.sending = '📋';
global.sent = '❇️';
global.notsent = '❗';
global.waitemot = '⌛';
global.waitemot2 = '⏳';

global.multiplier = 200;

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.bold.greenBright(lenguajeGB['smsConfigBot']().trim()));
  import(`${file}?update=${Date.now()}`);
});
