import Cookies from 'js-cookie';

// Отримуємо дані з змінних середовища
const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'bondcoffee2025'
};

const AUTH_COOKIE_NAME = import.meta.env.VITE_AUTH_COOKIE_NAME || 'bond_admin_auth';
const AUTH_COOKIE_EXPIRES = parseInt(import.meta.env.VITE_AUTH_COOKIE_EXPIRES || '1'); // дні

export interface AuthService {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getAuthToken: () => string | undefined;
}

export const authService: AuthService = {
  async login(username: string, password: string): Promise<boolean> {
    // Симуляція затримки мережі
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Створюємо простий токен (в реальному проекті використовуйте JWT)
      const token = btoa(`${username}:${Date.now()}`);
      
      // Зберігаємо токен в cookie
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
      // Перевіряємо валідність токена
      const decoded = atob(token);
      const [username, timestamp] = decoded.split(':');
      
      if (username !== ADMIN_CREDENTIALS.username) return false;
      
      // Перевіряємо, чи не застарів токен (24 години)
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