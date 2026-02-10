'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function SocialLoginButtons() {
  const { socialLogin } = useAuth();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'kakao' | 'naver') => {
    setIsLoading(provider);
    try {
      await socialLogin(provider);
    } catch (error) {
      console.error('소셜 로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Google 로그인 */}
      <button
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="font-medium text-gray-700">
          {isLoading === 'google' ? '로그인 중...' : 'Google로 계속하기'}
        </span>
      </button>

      {/* Kakao 로그인 */}
      <button
        onClick={() => handleSocialLogin('kakao')}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
        style={{ backgroundColor: '#FEE500' }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#000000"
            d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.7-.6 2.1-.7 2.5 0 .3.1.5.3.5.2 0 2.3-1.5 3.1-2.1.8.1 1.6.2 2.5.2 5.5 0 10-3.6 10-8S17.5 3 12 3z"
          />
        </svg>
        <span className="font-medium text-gray-900">
          {isLoading === 'kakao' ? '로그인 중...' : 'Kakao로 계속하기'}
        </span>
      </button>

      {/* Naver 로그인 */}
      <button
        onClick={() => handleSocialLogin('naver')}
        disabled={isLoading !== null}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-colors disabled:opacity-50"
        style={{ backgroundColor: '#03C75A' }}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
        </svg>
        <span className="font-medium text-white">
          {isLoading === 'naver' ? '로그인 중...' : 'Naver로 계속하기'}
        </span>
      </button>
    </div>
  );
}
