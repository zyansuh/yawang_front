'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: '홈', icon: '🏠' },
  { href: '/categories', label: '카테고리', icon: '📂' },
  { href: '/bookmarks', label: '북마크', icon: '⭐' },
  { href: '/profile', label: '내 정보', icon: '👤' }
];

export default function BottomNav() {
  const pathname = usePathname();

  // auth 페이지에서는 하단 네비 숨김
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
