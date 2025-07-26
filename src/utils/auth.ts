import Cookies from 'js-cookie';

const ADMIN_CREDENTIALS = {
  username: import.meta.env.VITE_ADMIN_USERNAME,
  password: import.meta.env.VITE_ADMIN_PASSWORD
};

const AUTH_COOKIE_NAME = import.meta.env.VITE_AUTH_COOKIE_NAME;
const AUTH_COOKIE_EXPIRES = parseInt(process.env.VITE_AUTH_COOKIE_EXPIRES || '1', 10);


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