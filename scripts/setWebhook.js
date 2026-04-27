const axios = require('axios');

require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not set');
}

if (!WEBHOOK_URL) {
  throw new Error('WEBHOOK_URL is not set');
}
async function setWebhook() {
  try {
    console.log(' Настраиваю веб-хук...');
    console.log(` URL: ${WEBHOOK_URL}`);
    
    const response = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}`
    );
    
    console.log(' Веб-хук установлен!');
    console.log(' Ответ Telegram:', response.data.description);
    
  } catch (error) {
    console.error(' Ошибка настройки веб-хука:');
    if (error.response) {
      console.log(' Ответ сервера:', error.response.data);
    } else {
      console.log(' Ошибка:', error.message);
    }
  }
}

setWebhook();