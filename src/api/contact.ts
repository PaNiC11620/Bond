export interface ContactMessageData {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends ContactMessageData {
  id: number;
  created_at: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

export async function createContactMessage(message: ContactMessageData): Promise<ContactMessage> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Помилка при відправці повідомлення:', error);
    throw new Error(
      error instanceof Error 
        ? `Помилка при відправці повідомлення: ${error.message}`
        : 'Невідома помилка при відправці повідомлення'
    );
  }
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Помилка при отриманні повідомлень:', error);
    throw new Error(
      error instanceof Error 
        ? `Помилка при отриманні повідомлень: ${error.message}`
        : 'Невідома помилка при отриманні повідомлень'
    );
  }
}

export async function deleteContactMessage(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Помилка при видаленні повідомлення:', error);
    throw new Error(
      error instanceof Error 
        ? `Помилка при видаленні повідомлення: ${error.message}`
        : 'Невідома помилка при видаленні повідомлення'
    );
  }
}