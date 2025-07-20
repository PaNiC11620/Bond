export interface OrderData {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  coffee_type: string;
  package_size: string;
  quantity: number;
  total_price: number;
}

export interface Order extends OrderData {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001/api';

export async function createOrder(order: OrderData): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Помилка при створенні замовлення:', error);
    throw new Error(
      error instanceof Error 
        ? `Помилка при створенні замовлення: ${error.message}`
        : 'Невідома помилка при створенні замовлення'
    );
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Помилка при отриманні замовлень:', error);
    throw new Error(
      error instanceof Error 
        ? `Помилка при отриманні замовлень: ${error.message}`
        : 'Невідома помилка при отриманні замовлень'
    );
  }
}

export async function getOrderById(id: number): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Помилка при отриманні замовлення:', error);
    throw new Error(
      error instanceof Error 
        ? `Помилка при отриманні замовлення: ${error.message}`
        : 'Невідома помилка при отриманні замовлення'
    );
  }
}

export async function updateOrderStatus(id: number, status: string): Promise<Order> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Помилка при оновленні статусу:', error);
    throw new Error(
      error instanceof Error 
        ? `Помилка при оновленні статусу: ${error.message}`
        : 'Невідома помилка при оновленні статусу'
    );
  }
}

export async function deleteOrder(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Помилка при видаленні замовлення:', error);
    throw new Error(
      error instanceof Error 
        ? `Помилка при видаленні замовлення: ${error.message}`
        : 'Невідома помилка при видаленні замовлення'
    );
  }
}