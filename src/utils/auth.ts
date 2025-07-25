import Cookies from 'js-cookie';
<<<<<<< HEAD
import dotenv from 'dotenv';
=======
>>>>>>> bbf8e686a8733c656b7d643d5d00180b05b8325a

// Константи для авторизації (в реальному проекті це має бути в змінних середовища)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'bondcoffee2025'
};

const AUTH_COOKIE_NAME = 'bond_admin_auth';
const AUTH_COOKIE_EXPIRES = 1; // 1 день

export interface AuthService {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getAuthToken: () => string | undefined;
}

export const authService: AuthService = {
  async login(username: string, password: string): Promise<boolean> {
<<<<<<< HEAD
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = btoa(`${username}:${Date.now()}`);
      
=======
    // Симуляція затримки мережі
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Створюємо простий токен (в реальному проекті використовуйте JWT)
      const token = btoa(`${username}:${Date.now()}`);
      
      // Зберігаємо токен в cookie
>>>>>>> bbf8e686a8733c656b7d643d5d00180b05b8325a
      Cookies.set(AUTH_COOKIE_NAME, token, { 
        expires: AUTH_COOKIE_EXPIRES,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      return true;
    }
    
    return false;
  },

  logout(): void {
    Cookies.remove(AUTH_COOKIE_NAME);
  },

  isAuthenticated(): boolean {
    const token = Cookies.get(AUTH_COOKIE_NAME);
    if (!token) return false;
    
    try {
<<<<<<< HEAD
=======
      // Перевіряємо валідність токена
>>>>>>> bbf8e686a8733c656b7d643d5d00180b05b8325a
      const decoded = atob(token);
      const [username, timestamp] = decoded.split(':');
      
      if (username !== ADMIN_CREDENTIALS.username) return false;
      
<<<<<<< HEAD
=======
      // Перевіряємо, чи не застарів токен (24 години)
>>>>>>> bbf8e686a8733c656b7d643d5d00180b05b8325a
      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      const hoursDiff = (now - tokenTime) / (1000 * 60 * 60);
      
      return hoursDiff < 24;
    } catch {
      return false;
    }
  },

  getAuthToken(): string | undefined {
    return Cookies.get(AUTH_COOKIE_NAME);
  }
};