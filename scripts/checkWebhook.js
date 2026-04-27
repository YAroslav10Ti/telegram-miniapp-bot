const axios = require('axios');

require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not set');
}

async function checkWebhook() {
  try {
    console.log(' Проверяю веб-хук...');
    
    const response = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`
    );
    
    const webhookInfo = response.data.result;
    
    console.log('══════════════════════════════════════');
    console.log(' ИНФОРМАЦИЯ О ВЕБ-ХУКЕ:');
    console.log('══════════════════════════════════════');
    console.log(' URL:', webhookInfo.url);
    console.log(' Работает:', webhookInfo.has_custom_certificate ? 'Да' : 'Нет');
    console.log(' Ожидающие сообщения:', webhookInfo.pending_update_count);
    console.log(' Последняя ошибка:', webhookInfo.last_error_message || 'Нет ошибок');
    console.log(' Последняя ошибка:', webhookInfo.last_error_date ? new Date(webhookInfo.last_error_date * 1000).toLocaleString() : 'Никогда');
    console.log('══════════════════════════════════════');
    
  } catch (error) {
    console.error('❌ Ошибка проверки веб-хука:');
    console.log(error.response?.data || error.message);
  }
}

checkWebhook();