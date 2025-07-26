import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import { ordersDB, contactDB, testConnection, initDatabase } from '../lib/database.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://bond-coffee.onrender.com', 'https://bond-coffee-*.onrender.com']
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../dist')));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

app.post('/api/orders', async (req, res) => {
  try {
    const order = await ordersDB.create(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('❌ Помилка створення замовлення:', error);
    res.status(500).json({ success: false, error: 'Помилка сервера при створенні замовлення' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await ordersDB.getAll();
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('❌ Помилка отримання замовлень:', error);
    res.status(500).json({ success: false, error: 'Помилка сервера при отриманні замовлень' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await ordersDB.getById(parseInt(req.params.id));
    if (!order) return res.status(404).json({ success: false, error: 'Замовлення не знайдено' });
    res.json({ success: true, data: order });
  } catch (error) {
    console.error('❌ Помилка отримання замовлення:', error);
    res.status(500).json({ success: false, error: 'Помилка сервера при отриманні замовлення' });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const order = await ordersDB.updateStatus(parseInt(req.params.id), req.body.status);
    if (!order) return res.status(404).json({ success: false, error: 'Замовлення не знайдено' });
    res.json({ success: true, data: order });
  } catch (error) {
    console.error('❌ Помилка оновлення статусу:', error);
    res.status(500).json({ success: false, error: 'Помилка сервера при оновленні статусу' });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const deleted = await ordersDB.delete(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ success: false, error: 'Замовлення не знайдено' });
    res.json({ success: true, message: 'Замовлення видалено' });
  } catch (error) {
    console.error('❌ Помилка видалення замовлення:', error);
    res.status(500).json({ success: false, error: 'Помилка сервера при видаленні замовлення' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const message = await contactDB.create(req.body);
    res.status(201).json({ success: true, data: message });
  } catch (error) {
    console.error('❌ Помилка збереження повідомлення:', error);
    res.status(500).json({ success: false, error: 'Помилка сервера при збереженні повідомлення' });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const messages = await contactDB.getAll();
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('❌ Помилка отримання повідомлень:', error);
    res.status(500).json({ success: false, error: 'Помилка сервера при отриманні повідомлень' });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    const deleted = await contactDB.delete(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ success: false, error: 'Повідомлення не знайдено' });
    res.json({ success: true, message: 'Повідомлення видалено' });
  } catch (error) {
    console.error('❌ Помилка видалення повідомлення:', error);
    res.status(500).json({ success: false, error: 'Помилка сервера при видаленні повідомлення' });
  }
});

app.get('/api/health', async (_req, res) => {
  const dbConnected = await testConnection();
  res.json({
    success: true,
    server: 'Bond Coffee API',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/auth/config', (_req, res) => {
  res.json({
    username: process.env.VITE_ADMIN_USERNAME || 'admin',
    password: process.env.VITE_ADMIN_PASSWORD || 'bondcoffee2025',
    cookieName: process.env.VITE_AUTH_COOKIE_NAME || 'bond_admin_auth',
    cookieExpires: parseInt(process.env.VITE_AUTH_COOKIE_EXPIRES || '1', 10)
  });
});

const startServer = async () => { 
  try {
    await initDatabase(); 
    console.log('✅ Структура БД перевірена/створена.');

    app.listen(PORT, () => {
      console.log(`🚀 Сервер Bond Coffee запущено на порту ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Помилка запуску сервера або ініціалізації БД:', error);
    process.exit(1); 
  }
};

startServer();