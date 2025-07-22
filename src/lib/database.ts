import { Pool } from 'pg';
import dotenv from 'dotenv';

// Завантажуємо змінні середовища
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' });
}

console.log('🔧 Налаштування бази даних:');
console.log('- Environment:', process.env.NODE_ENV || 'development');
console.log('- Database URL:', process.env.DATABASE_URL ? 'ВСТАНОВЛЕНО (Render PostgreSQL)' : 'НЕ ВСТАНОВЛЕНО');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    'postgresql://bond_user:X1fbNEWIXUUo12pkyxZlDbUdK2QSYLjh@dpg-d1v7k2ruibrs7395bju0-a.frankfurt-postgres.render.com/db_63dv',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Типи для бази даних
export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  coffee_type: string;
  package_size: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface OrderInput {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  coffee_type: string;
  package_size: string;
  quantity: number;
  total_price: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: Date;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  message: string;
}

// Функції для роботи з замовленнями
export const ordersDB = {
  async create(order: OrderInput): Promise<Order> {
    const query = `
      INSERT INTO orders (customer_name, customer_phone, customer_email, coffee_type, package_size, quantity, total_price) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      order.customer_name,
      order.customer_phone,
      order.customer_email,
      order.coffee_type,
      order.package_size,
      order.quantity,
      order.total_price
    ]);
    
    return result.rows[0];
  },

  async getAll(): Promise<Order[]> {
    const query = 'SELECT * FROM orders ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  async getById(id: number): Promise<Order | null> {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  async updateStatus(id: number, status: string): Promise<Order | null> {
    const query = 'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM orders WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
};

// Функції для роботи з контактними повідомленнями
export const contactDB = {
  async create(message: ContactMessageInput): Promise<ContactMessage> {
    const query = `
      INSERT INTO contact_messages (name, email, message) 
      VALUES ($1, $2, $3) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      message.name,
      message.email,
      message.message
    ]);
    
    return result.rows[0];
  },

  async getAll(): Promise<ContactMessage[]> {
    const query = 'SELECT * FROM contact_messages ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  },

  async getById(id: number): Promise<ContactMessage | null> {
    const query = 'SELECT * FROM contact_messages WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM contact_messages WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
};

// Функція для ініціалізації бази даних
export const initDatabase = async (): Promise<void> => {
  try {
    console.log('🔧 Ініціалізація структури бази даних...');
    
    // Створюємо таблицю замовлень, якщо вона не існує
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        coffee_type VARCHAR(255) NOT NULL,
        package_size VARCHAR(50) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        total_price DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Створюємо таблицю контактних повідомлень
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Створюємо індекси для оптимізації
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC)
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC)
    `);

    // Створюємо функцію для автоматичного оновлення updated_at
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql'
    `);

    // Створюємо тригер для автоматичного оновлення updated_at
    await pool.query(`
      DROP TRIGGER IF EXISTS update_orders_updated_at ON orders
    `);
    
    await pool.query(`
      CREATE TRIGGER update_orders_updated_at
        BEFORE UPDATE ON orders
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column()
    `);

    console.log('✅ Структура бази даних успішно ініціалізована');
  } catch (error) {
    console.error('❌ Помилка ініціалізації структури бази даних:', error);
    throw error;
  }
};

// Функція для перевірки підключення до бази даних
export const testConnection = async (): Promise<boolean> => {
  try {
    console.log('🔍 Перевіряємо підключення до PostgreSQL...');
    await pool.query('SELECT NOW()');
    console.log('✅ Підключення до PostgreSQL успішне');
    return true;
  } catch (error) {
    console.error('❌ Помилка підключення до PostgreSQL:');
    console.error('Деталі помилки:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('password authentication failed')) {
        console.log('💡 Помилка аутентифікації. Перевірте пароль у .env або на Render.');
        return false;
      }
      if (error.message.includes('connection refused') || error.message.includes('timeout')) {
        console.log('💡 Не вдалося підключитися до хоста бази даних. Перевірте, чи доступна БД.');
        return false;
      }
      if (error.message.includes('database "db_63dv" does not exist')) {
          console.log('💡 База даних за вказаним URL не знайдена. Перевірте DATABASE_URL.');
          return false;
      }
    }
    
    return false;
  }
};

export default pool;