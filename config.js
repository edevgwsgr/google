import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
import { en, es, id, ar, pt } from './lib/idiomas/total-idiomas.js'

global.owner = [
['212641207087', '𝙊𝙬𝙣𝙚𝙧', true], // owner
['212705776824', '𝘼𝙨𝙞𝙨𝙩𝙚𝙣𝙘𝙞𝙖', true],
['212641207087', 'Develooper', true]]

global.mods = ['212641207087','212705776824'] 
global.prems = ['212641207087','212705776824']
   
// ES ➜ Agregue el código de idioma el cual usará GataBot  
// EN ➜ Add the language code which GataBot will use
//  es = Español      id = Bahasa Indonesia       ar = عرب
//  en = English      pt = Português 
global.lenguajeGB = en  //<-- Predeterminado en idioma Español 

// ES ➜ Consigue Apikey en https://platform.openai.com/account/api-keys
global.openai_key = 'sk-0'

// ES ➜ Consigue tu ID de organizacion en: https://platform.openai.com/account/org-settings
global.openai_org_id = 'org-3'

global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = 'GataDios'
global.itsrose = ['4b146102c4d500809da9d1ff']
global.baileys = '@whiskeysockets/baileys'

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
},
global.APIKeys = { 
  'https://api.xteam.xyz': `${keysxteam}`,
  'https://api.lolhuman.xyz': `${lolkeysapi}`,
  'https://api.neoxr.my.id': `${keysneoxr}`,	
  'https://violetics.pw': 'beta',
  'https://api.zahwazein.xyz': `${keysxxx}`,
  'https://api-fgmods.ddns.net': 'fg-dylux',
  'https://api.botcahx.biz.id': 'Admin',
  'https://api.ibeng.tech/docs': 'tamvan',
  'https://api.itsrose.site': 'Rs-Zeltoria',
  'https://api-xcoders.site': 'Frieren'
}

global.mods = [] 
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment	

global.packname = 'JEEN'
global.author = 'MD'
// waitt
global.wait = "_*Please wait...*_"
global.waitt = "_*Please wait..*_"
global.waittt = "_*Please wait.*_"
global.waitttt = "_*Please wait*_"

// ES ➜ Está parte es para mostrar el contacto de alguien al usar #contacto
// EN ➜ This part is to display someone's contact using #contact
global.official = [ 
['212621851554', 'test', 1], 
['212641207087', 'test', 1],  
['59894808483', 'test', 1],
['5521989092076', 'test', 1]] 

global.mail = 'support@mee6.ai' //agrega tú correo
global.desc = '' //agrega una descripción corta
global.desc2 = '' //agrega una descripción larga (Solo se aplicará si su whasapp no tiene descripción)
global.country = 'moroco' //agrega tú país ejemplo: 🇪🇨

global.vs = '1.5.2 (beta)'
global.vsJB = '4.5 (Beta)'

global.wait = "*Charging..._ ▬▭▭▭▭▭▭*"
global.waitt = "*Charging..._ ▬▬▭▭▭*"
global.waittt = "*Charging..._ ▬▬▬▬▭▭*"
global.waitttt = "*Charging..._ ▬▬▬▬▬▬▭*"
global.waittttt = "*Filled..._ ▬▬▬▬▬▬▬*"

global.gt = 'JEEN'
global.yt = 'youtube.com/'
global.yt2 = 'youtu.be/'
global.ig = 'instagram.com/majnon._.98'
global.md = 'chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be'
global.fb = 'https://www.facebook.com/jamaa.abdessamad'

global.thumbnailUrl = ['https://telegra.ph/file/3e168b7f803aa0d2ecf02.jpg', 'https://telegra.ph/file/a0c30e910d01267ed62de.jpg', 'https://telegra.ph/file/d4af53b64529bdd137227.jpg']

global.nna = 'https://whatsapp.com/channel/0029Va8dVNTGE56gO21d3a3c' //CANAL UPDATE
global.nn2 = 'HJvDM8zYgsIKu0hMW3i5be' //Canal GataBot
global.nna2 = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be' //Help
global.nn = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be' //Grupo 1
global.nnn = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be' //Grupo 2
global.nnnt = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be' //Grupo 3
global.nnntt = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be' //Grupo 4
global.nnnttt = 'https://chat.whatsapp.com/HJvDM8zYgsIKu0hMW3i5be' //Grupo 5
global.nnnttt1 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r' //Grupo 6 COL
global.nnnttt2 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r' //Grupo 7 COL
global.nnnttt3 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r' //Grupo 8 COL
global.nnnttt4 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r' //Grupo 9 COL
global.nnnttt5 = 'https://chat.whatsapp.com/LnqUcqNXFlj8ATVAQS0l6r' //A.T.M.M
global.paypal = 'https://paypal.me/majnonrossi'
global.asistencia = 'Wa.me/212641207087' //Dudas? escríbeme...

global.wm = 'JEEN-MD'
global.igfg = 'JEEN-MD'
global.nomorown = owner[0][0]

global.imagen1 = fs.readFileSync('./media/menus/Menu3.jpg')
global.imagen2 = fs.readFileSync('./media/menus/img1.jpg')
global.imagen3 = fs.readFileSync('./media/menus/img2.jpg')
global.imagen4 = fs.readFileSync('./media/menus/img3.jpg')
global.imagen5 = fs.readFileSync('./media/menus/img4.jpg')
global.imagen6 = fs.readFileSync('./media/menus/img5.jpg')
global.imagen7 = fs.readFileSync('./media/menus/img6.jpg')
global.imagen8 = fs.readFileSync('./media/menus/img7.jpg')
global.imagen9 = fs.readFileSync('./media/menus/img8.jpg')
global.imagen10 = fs.readFileSync('./media/menus/img9.jpg')
global.imagen11 = fs.readFileSync('./media/menus/img10.jpg')
global.imagen12 = fs.readFileSync('./media/menus/img11.jpg')
global.imagen13 = fs.readFileSync('./media/menus/img12.jpg')

global.img = 'https://i.imgur.com/AwlL9kc.jpeg'
global.img2 = 'https://i.imgur.com/p18q1Ok.jpeg'
global.img3 = 'https://i.imgur.com/01Z8a0a.jpg' //ft rectangular
global.img5 = 'https://i.imgur.com/80uz37R.jpeg'
global.img6 = 'https://i.imgur.com/3zSvnGY.jpeg'
global.img7 = 'https://i.imgur.com/WY4r6up.jpeg'
global.img8 = 'https://i.imgur.com/qCO3RYa.jpeg'
global.img9 = 'https://i.imgur.com/dWk51FS.jpeg'
global.img10 = 'https://i.imgur.com/T4NjKMi.jpeg'
global.img11 = 'https://i.imgur.com/jqyWSlh.jpeg'
global.img12 = 'https://i.imgur.com/mpCRttm.jpeg'
global.img13 = 'https://i.imgur.com/O04epJI.jpeg'
global.img14 = 'https://i.imgur.com/jfbuJRU.jpeg'
global.img15 = 'https://i.imgur.com/DzqUXkW.jpeg'
global.img17 = 'https://i.imgur.com/Y3ZWq7z.jpeg'
global.img18 = 'https://i.imgur.com/kaUN1Nz.jpeg'
global.img19 = 'https://i.imgur.com/7yJ22hJ.jpeg'
global.img20 = 'https://i.imgur.com/qcD353P.jpeg'
global.img21 = 'https://i.imgur.com/3fJTaX6.jpeg'
global.img21 = 'https://i.imgur.com/akofqcE.jpeg' //paypal

global.welgata = [ig, yt2, yt2, ig, md, ig, yt, paypal, yt2, yt2, ig, fb]
global.redesMenu = [nna, nn2, nn, nnn, nnnt, nnntt, nnnttt, nnnttt1, nnnttt2, nnnttt3, nnnttt4, md, ig, paypal, yt, asistencia, fb]
global.gataMenu = [img, img2, img6, img7, img8, img9, img13, img14, img15, img17, img18, img19, img20, img21]
global.gataImg = [imagen1, imagen2, imagen3, imagen4, imagen5, imagen6, imagen7, imagen8, imagen9, imagen10, imagen11, imagen12, imagen13]

global.htki = '*⭑•̩̩͙⊱•••• ☪*'
global.htka = '*☪ ••••̩̩͙⊰•⭑*'
global.htjava = '⫹⫺'
global.correct = '✅'
global.fault = '💔'
global.alert = '⚠️'
global.sending = '📋'
global.sent = '❇️'
global.notsent = '❗'
global.waitemot = '⌛'
global.waitemot2 = '⏳'

global.multiplier = 200 // Cuanto más alto, más difícil subir de nivel 

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.bold.greenBright(lenguajeGB['smsConfigBot']().trim()))
import(`${file}?update=${Date.now()}`)
})
