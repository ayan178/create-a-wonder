
import { BaseApiClient } from './api/BaseApiClient';

export type UserType = 'candidate' | 'employer';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCandidateData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  job_title?: string;
}

export interface RegisterEmployerData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  company_name: string;
  industry?: string;
  company_size?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  user_type: UserType;
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: UserType;
  created_at: string;
  [key: string]: any;  // For additional fields
}

class AuthService extends BaseApiClient {
  private tokenKey = 'ai_interview_token';
  private userKey = 'ai_interview_user';
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('/auth/login', credentials);
    this.saveToken(response.access_token);
    this.saveUser(response.user);
    return response;
  }
  
  async registerCandidate(data: RegisterCandidateData): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('/auth/register/candidate', data);
    this.saveToken(response.access_token);
    this.saveUser(response.user);
    return response;
  }
  
  async registerEmployer(data: RegisterEmployerData): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('/auth/register/employer', data);
    this.saveToken(response.access_token);
    this.saveUser(response.user);
    return response;
  }
  
  async refreshToken(): Promise<{ access_token: string }> {
    const response = await this.post<{ message: string; access_token: string }>('/auth/refresh', {});
    this.saveToken(response.access_token);
    return response;
  }
  
  async logout(): Promise<void> {
    try {
      await this.post('/auth/logout', {});
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.clearAuth();
    }
  }
  
  async getUserProfile(): Promise<User> {
    const response = await this.get<{ user: User }>('/auth/me');
    this.saveUser(response.user);
    return response.user;
  }
  
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  
  saveUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  getUser(): User | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  getUserType(): UserType | null {
    const user = this.getUser();
    return user ? user.user_type as UserType : null;
  }
  
  clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}

export const authService = new AuthService();
