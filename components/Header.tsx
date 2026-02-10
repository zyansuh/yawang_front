'use client';

import Link from 'next/link';

export default function Header() {
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
            <button className="text-gray-600 hover:text-gray-900">
              🔔
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
