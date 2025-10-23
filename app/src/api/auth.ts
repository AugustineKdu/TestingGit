/**
 * 인증 관련 API
 */

import api from './client';

// 타입 정의
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  agreeToTerms: boolean;
  agreeToMarketing?: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
    profileImage?: string;
    createdAt: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface SocialLoginRequest {
  token: string;
  deviceInfo: {
    platform: 'ios' | 'android';
    version: string;
  };
}

// API 함수
export const authApi = {
  // 로그인
  login: (data: LoginRequest) =>
    api.post<AuthResponse>('/auth/login', data),

  // 회원가입
  signup: (data: SignupRequest) =>
    api.post<AuthResponse>('/auth/signup', data),

  // 소셜 로그인
  socialLogin: (provider: 'google' | 'apple', data: SocialLoginRequest) =>
    api.post<AuthResponse>(`/auth/social/${provider}`, data),

  // 토큰 갱신
  refresh: (refreshToken: string) =>
    api.post<{ accessToken: string; expiresIn: number }>(
      '/auth/refresh',
      { refreshToken }
    ),

  // 로그아웃
  logout: () => api.post('/auth/logout'),
};
