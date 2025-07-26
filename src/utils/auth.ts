import Cookies from 'js-cookie';
import dotenv from 'dotenv';
  
dotenv.config({ path: '.env' });

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'bondcoffee2025'
};

const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'bond_admin_auth';
const AUTH_COOKIE_EXPIRES = parseInt(process.env.AUTH_COOKIE_EXPIRES || '1', 10);

export interface AuthService {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: () => boolean;
  getAuthToken: () => string | undefined;
}

export const authService: AuthService = {
  async login(username: string, password: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = btoa(`${username}:${Date.now()}`);
      
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
      const decoded = atob(token);
      const [username, timestamp] = decoded.split(':');
      
      if (username !== ADMIN_CREDENTIALS.username) return false;
      
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