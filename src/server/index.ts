import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { ordersDB, contactDB, createDatabaseIfNotExists, initDatabase, testConnection } from '../lib/database';

dotenv.config({ path: '.env' });

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.post('/api/orders', async (req, res) => {
  try {
    console.log('📝 Отримано нове замовлення:', req.body);
    
    const order = await ordersDB.create(req.body);
    
    console.log('✅ Замовлення успішно створено:', order);
    res.status(201).json({
      success: true,
      data: order,
      message: 'Замовлення успішно створено'
    });
  } catch (error) {
    console.error('❌ Помилка створення замовлення:', error);
    res.status(500).json({
      success: false,
      error: 'Помилка сервера при створенні замовлення'
    });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await ordersDB.getAll();
    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('❌ Помилка отримання замовлень:', error);
    res.status(500).json({
      success: false,
      error: 'Помилка сервера при отриманні замовлень'
    });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const order = await ordersDB.getById(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Замовлення не знайдено'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('❌ Помилка отримання замовлення:', error);
    res.status(500).json({
      success: false,
      error: 'Помилка сервера при отриманні замовлення'
    });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    
    const order = await ordersDB.updateStatus(id, status);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Замовлення не знайдено'
      });
    }
    
    console.log(`✅ Статус замовлення #${id} оновлено на: ${status}`);
    res.json({
      success: true,
      data: order,
      message: 'Статус замовлення оновлено'
    });
  } catch (error) {
    console.error('❌ Помилка оновлення статусу:', error);
    res.status(500).json({
      success: false,
      error: 'Помилка сервера при оновленні статусу'
    });
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await ordersDB.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Замовлення не знайдено'
      });
    }
    
    console.log(`✅ Замовлення #${id} видалено`);
    res.json({
      success: true,
      message: 'Замовлення видалено'
    });
  } catch (error) {
    console.error('❌ Помилка видалення замовлення:', error);
    res.status(500).json({
      success: false,
      error: 'Помилка сервера при видаленні замовлення'
    });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    console.log('📧 Отримано нове повідомлення:', req.body);
    
    const message = await contactDB.create(req.body);
    
    console.log('✅ Повідомлення успішно збережено:', message);
    res.status(201).json({
      success: true,
      data: message,
      message: 'Повідомлення успішно відправлено'
    });
  } catch (error) {
    console.error('❌ Помилка збереження повідомлення:', error);
    res.status(500).json({
      success: false,
      error: 'Помилка сервера при збереженні повідомлення'
    });
  }
});

app.get('/api/contact', async (req, res) => {
  try {
    const messages = await contactDB.getAll();
    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('❌ Помилка отримання повідомлень:', error);
    res.status(500).json({
      success: false,
      error: 'Помилка сервера при отриманні повідомлень'
    });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await contactDB.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Повідомлення не знайдено'
      });
    }
    
    console.log(`✅ Повідомлення #${id} видалено`);
    res.json({
      success: true,
      message: 'Повідомлення видалено'
    });
  } catch (error) {
    console.error('❌ Помилка видалення повідомлення:', error);
    res.status(500).json({
      success: false,
      error: 'Помилка сервера при видаленні повідомлення'
    });
  }
});

app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({
    success: true,
    server: 'Bond Coffee API',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

const startServer = async () => {
  try {
    console.log('🚀 Запуск сервера Bond Coffee...');
    console.log('📋 Перевіряємо налаштування...');

    if (!process.env.DB_PASSWORD) {
      console.error('❌ КРИТИЧНА ПОМИЛКА: DB_PASSWORD не встановлено в .env.local');
      console.log('💡 Створіть файл .env.local та додайте:');
      console.log('DB_HOST=localhost');
      console.log('DB_PORT=5432');
      console.log('DB_NAME=bond_coffee');
      console.log('DB_USER=postgres');
      console.log('DB_PASSWORD=ваш_пароль');
      process.exit(1);
    }

    let dbConnected = await testConnection();
    
    if (!dbConnected) {
      try {
        console.log('🔧 Спробуємо створити базу даних...');
        await createDatabaseIfNotExists();
        dbConnected = await testConnection();
      } catch (createError) {
        console.error('❌ Не вдалося створити базу даних:', createError);
        console.log('\n💡 Можливі рішення:');
        console.log('1. Перевірте, чи запущений PostgreSQL сервер');
        console.log('2. Перевірте правильність даних у .env.local');
        console.log('3. Створіть базу даних вручну:');
        console.log('   sudo -u postgres psql');
        console.log('   CREATE DATABASE bond_coffee;');
        console.log('   \\q');
        process.exit(1);
      }
    }

    if (!dbConnected) {
      console.error('❌ Не вдалося підключитися до бази даних');
      process.exit(1);
    }

    await initDatabase();

    app.listen(PORT, () => {
      console.log('\n🎉 Сервер Bond Coffee успішно запущено!');
      console.log(`🌐 Frontend: http://localhost:5173`);
      console.log(`🔌 Backend API: http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
      console.log('\n📊 Статистика:');
      console.log('✅ PostgreSQL підключено');
      console.log('✅ Таблиці створено');
      console.log('✅ API готове до роботи');
      console.log('\n🎯 Тепер можете робити замовлення та надсилати повідомлення!');
    });
  } catch (error) {
    console.error('❌ Критична помилка запуску сервера:', error);
    process.exit(1);
  }
};

startServer();