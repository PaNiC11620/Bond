import Cookies from 'js-cookie';

// Отримуємо дані з сервера через API
const getAuthConfig = async () => {
  try {
    const response = await fetch('/api/auth/config');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Помилка отримання конфігурації авторизації:', error);
  }
  
  // Fallback значення
  return {
    username: 'admin',
    password: 'bondcoffee2025',
    cookieName: 'bond_admin_auth',
    cookieExpires: 1
  };
};

export interface AuthService {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getAuthToken: () => string | undefined;
}

export const authService: AuthService = {
  async login(username: string, password: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const config = await getAuthConfig();
    
    if (username === config.username && password === config.password) {
      const token = btoa(`${username}:${Date.now()}`);
      
      Cookies.set(config.cookieName, token, { 
        expires: config.cookieExpires,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      return true;
    }
    
    return false;
  },

  logout(): void {
    // Використовуємо стандартне ім'я cookie для видалення
    Cookies.remove('bond_admin_auth');
  },

  isAuthenticated(): boolean {
    const token = Cookies.get('bond_admin_auth');
    if (!token) return false;
    
    try {
      const config = { username: 'admin' }; // Fallback для перевірки
      // Перевіряємо валідність токена
      const decoded = atob(token);
      const [username, timestamp] = decoded.split(':');
      
      if (username !== config.username) return false;
      
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
    return Cookies.get('bond_admin_auth');
  }
};