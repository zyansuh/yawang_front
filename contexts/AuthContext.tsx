'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  socialLogin: (provider: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 앱 시작 시 로컬스토리지에서 사용자 정보 로드
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // 로그인 함수
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: API 연동
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      
      // 임시 Mock 데이터
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        email,
        name: '테스트 사용자',
        role: 'member',
        isInvited: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      // localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 함수
  const signup = async (data: any) => {
    setIsLoading(true);
    try {
      // TODO: API 연동
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();
      
      // 임시 Mock 데이터
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        role: data.inviteCode ? 'member' : 'guest',
        isInvited: !!data.inviteCode,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 소셜 로그인 함수
  const socialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      // TODO: API 연동
      // window.location.href = `/api/auth/social/${provider}`;
      
      // 임시 Mock 데이터
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: '1',
        email: `user@${provider}.com`,
        name: `${provider} 사용자`,
        role: 'member',
        isInvited: false,
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      alert(`${provider} 로그인 성공! (Mock)`);
    } catch (error) {
      console.error('소셜 로그인 실패:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    // TODO: API 연동
    // fetch('/api/auth/logout', { method: 'POST' });
    
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // 사용자 정보 업데이트
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        socialLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// useAuth 훅
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내에서 사용해야 합니다');
  }
  return context;
}
