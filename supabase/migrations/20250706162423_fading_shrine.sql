CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text NOT NULL,
  coffee_type text NOT NULL,
  package_size text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total_price numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Дозволити читання всіх замовлень"
  ON orders
  FOR SELECT
  USING (true);

CREATE POLICY "Дозволити створення замовлень"
  ON orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Дозволити оновлення замовлень"
  ON orders
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE orders IS 'Таблиця замовлень кави';
COMMENT ON COLUMN orders.id IS 'Унікальний ідентифікатор замовлення';
COMMENT ON COLUMN orders.customer_name IS 'Повне ім''я клієнта';
COMMENT ON COLUMN orders.customer_phone IS 'Номер телефону клієнта';
COMMENT ON COLUMN orders.customer_email IS 'Email адреса клієнта';
COMMENT ON COLUMN orders.coffee_type IS 'Назва типу кави';
COMMENT ON COLUMN orders.package_size IS 'Розмір упаковки (250g, 500g, 1kg)';
COMMENT ON COLUMN orders.quantity IS 'Кількість упаковок';
COMMENT ON COLUMN orders.total_price IS 'Загальна вартість замовлення в гривнях';
COMMENT ON COLUMN orders.status IS 'Статус замовлення (pending, confirmed, processing, shipped, delivered, cancelled)';
COMMENT ON COLUMN orders.created_at IS 'Дата та час створення замовлення';
COMMENT ON COLUMN orders.updated_at IS 'Дата та час останнього оновлення замовлення';