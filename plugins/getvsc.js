const axios = require('axios');

const headers = {
  'Authorization': 'Bearer 2dBh1scfMV7YNOHGcPBewUQRmoo_7PdYqZDN4pjNdYFAZDbhy',
  'Ngrok-Version': '2'
};

const handler = async (m) => {
let res = axios.get('https://api.ngrok.com/endpoints', { headers })
  try {
      await m.reply(response.data.endpoints[0].public_url)
  } catch (error) {
      await m.reply(error);
  }
}
handler.command = /^(vsc)$/i
handler.admin = true
export default handler
