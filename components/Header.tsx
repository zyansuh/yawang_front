'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // auth 페이지에서는 헤더 숨김
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">야왕</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              🔍
            </button>
            {user && (
              <button className="text-gray-600 hover:text-gray-900">
                🔔
              </button>
            )}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
