'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole = 'member',
  redirectTo = '/auth/login'
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo);
    }
  }, [user, isLoading, router, redirectTo]);

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인하지 않음
  if (!user) {
    return null;
  }

  // 권한 체크
  const roleLevel: Record<UserRole, number> = {
    guest: 0,
    member: 1,
    verified: 2,
    premium: 3,
  };

  if (roleLevel[user.role] < roleLevel[requiredRole]) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h2>
          <p className="text-gray-600 mb-6">
            이 콘텐츠는 {requiredRole === 'verified' && '인증 회원'}
            {requiredRole === 'premium' && '프리미엄 회원'}만 볼 수 있습니다.
          </p>
          {requiredRole === 'verified' && user.role === 'member' && (
            <button
              onClick={() => router.push('/profile')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              2차 인증하기
            </button>
          )}
          {requiredRole === 'premium' && (
            <button
              onClick={() => router.push('/subscription')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              프리미엄 구독하기
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
