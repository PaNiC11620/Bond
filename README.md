# Bond Coffee - PostgreSQL версія

Це версія сайту кав'ярні Bond Coffee з локальною PostgreSQL базою даних.

## Налаштування

### 1. Встановлення PostgreSQL

Встановіть PostgreSQL на вашому комп'ютері:

**Windows:**
- Завантажте з https://www.postgresql.org/download/windows/
- Встановіть з налаштуваннями за замовчуванням

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Створення бази даних

Підключіться до PostgreSQL та створіть базу даних:

```bash
# Підключення до PostgreSQL
sudo -u postgres psql

# Створення бази даних
CREATE DATABASE bond_coffee;

# Створення користувача (опціонально)
CREATE USER bond_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE bond_coffee TO bond_user;

# Вихід
\q
```

### 3. Налаштування змінних середовища

Скопіюйте `.env.local` та налаштуйте підключення до вашої бази даних:

```bash
cp .env.local .env.local
```

Відредагуйте `.env.local`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bond_coffee
DB_USER=postgres  # або ваш користувач
DB_PASSWORD=your_password_here
SERVER_PORT=3001
```

### 4. Встановлення залежностей

```bash
npm install
```

### 5. Запуск проекту

```bash
npm run dev
```

Це запустить:
- Frontend на http://localhost:5173
- Backend API на http://localhost:3001

## API Endpoints

- `POST /api/orders` - Створення замовлення
- `GET /api/orders` - Отримання всіх замовлень
- `GET /api/orders/:id` - Отримання замовлення за ID
- `PUT /api/orders/:id/status` - Оновлення статусу замовлення
- `DELETE /api/orders/:id` - Видалення замовлення
- `GET /api/health` - Перевірка здоров'я сервера

## Особливості

✅ **Локальна база даних** - Повний контроль над даними
✅ **Швидкі запити** - Без затримок мережі
✅ **Автоматична ініціалізація** - База даних створюється автоматично
✅ **Реальний час** - Замовлення з'являються миттєво
✅ **Повний CRUD** - Створення, читання, оновлення, видалення
✅ **Адмін панель** - Управління замовленнями
✅ **Валідація** - Перевірка даних на сервері
✅ **Логування** - Детальні логи всіх операцій

## Структура бази даних

### Таблиця `orders`
- `id` - Унікальний ідентифікатор (SERIAL)
- `customer_name` - Ім'я клієнта
- `customer_phone` - Телефон клієнта
- `customer_email` - Email клієнта
- `coffee_type` - Тип кави
- `package_size` - Розмір упаковки
- `quantity` - Кількість
- `total_price` - Загальна ціна
- `status` - Статус замовлення
- `created_at` - Дата створення
- `updated_at` - Дата оновлення (автоматично)

## Розробка

Для розробки використовуйте:
```bash
npm run dev
```

Для запуску тільки клієнта:
```bash
npm run client
```

Для запуску тільки сервера:
```bash
npm run server
```

## Усунення проблем

### Помилка підключення до бази даних
1. Перевірте, чи запущений PostgreSQL:
   ```bash
   sudo systemctl status postgresql  # Linux
   brew services list | grep postgres  # macOS
   ```

2. Перевірте налаштування в `.env.local`

3. Перевірте, чи існує база даних:
   ```bash
   sudo -u postgres psql -l
   ```

### База даних не створюється автоматично
Створіть базу вручну:
```bash
sudo -u postgres psql
CREATE DATABASE bond_coffee;
\q
```

### Помилка аутентифікації
Перевірте пароль користувача PostgreSQL:
```bash
sudo -u postgres psql
ALTER USER postgres PASSWORD 'новий_пароль';
\q
```