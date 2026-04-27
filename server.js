// Подключаем библиотеки
const express = require('express');
const path = require('path');

// Создаем приложение
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Настройки
app.use(express.json());
app.use(express.static('public')); // Раздаем статические файлы из папки public

// Подключаем маршруты
const webhookRoutes = require('./routes/webhook');
app.use('/', webhookRoutes);

// Запускаем сервер
app.listen(PORT, () => {
  console.log('══════════════════════════════════════');
  console.log(' Сервер запущен!');
  console.log(` Порт: ${PORT}`);
  console.log(' Mini App: https://drivingly-unmethodized-valentin.ngrok-free.app');
  console.log('══════════════════════════════════════');
});  