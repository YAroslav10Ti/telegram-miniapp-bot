
const express = require('express');   // Веб-фреймворк
const axios = require('axios');       // Для отправки HTTP запросов
const router = express.Router();      // Создаем маршрутизатор

require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const MINI_APP_URL = process.env.MINI_APP_URL;

if (!BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not set');
}

if (!MINI_APP_URL) {
  throw new Error('MINI_APP_URL is not set');
}
router.post('/webhook', (req, res) => {
  console.log(' Получили сообщение от Telegram');
  
  const message = req.body.message;
  
  if (message && message.text) {
    handleMessage(message);
  }
  
  res.sendStatus(200);
});

async function handleMessage(message) {
  const chatId = message.chat.id;
  const text = message.text;
  
  console.log(` Пользователь написал: "${text}"`);
  
  if (text === '/start') {
    await sendWelcomeMessage(chatId);      // Приветствие
  } else if (text === '/help') {
    await sendHelpMessage(chatId);         // Помощь
  } else {
    await sendEchoMessage(chatId, text);   // Повтор сообщения
  }
}

async function sendWelcomeMessage(chatId) {
  await sendMessage(chatId, 
    'Привет! Я твой первый бот! \n\n' +
    'Что я умею:\n' +
    '• /start - показать это сообщение\n' +
    '• /help - помощь\n' +
    '• Просто напиши что-нибудь - я повторю!',
    {
      // Добавляем кнопку для открытия Mini App
      reply_markup: {
        inline_keyboard: [[
          {
            text: ' Открыть Mini App',
            web_app: { url: MINI_APP_URL }
          }
        ]]
      }
    }
  );
}

async function sendHelpMessage(chatId) {
  await sendMessage(chatId,
    '📖 Помощь по боту:\n\n' +
    'Это учебный бот для изучения Telegram Mini Apps.\n' +
    'Нажми кнопку "Открыть Mini App" чтобы увидеть веб-приложение!'
  );
}

async function sendEchoMessage(chatId, text) {
  await sendMessage(chatId, `Ты написал: "${text}"`);
}

async function sendMessage(chatId, text, options = {}) {
  try {

    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: chatId,  // Кому отправляем
      text: text,       // Что отправляем
      ...options        // Дополнительные опции (клавиатура и т.д.)
    });
    console.log(' Сообщение отправлено пользователю');
  } catch (error) {
    console.error(' Ошибка отправки:', error.message);
  }
}

module.exports = router;

