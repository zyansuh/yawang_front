'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">내 정보</h1>
          <p className="text-gray-600">계정 설정 및 구독 관리</p>
        </div>

        {/* 로그인 안내 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center max-w-md mx-auto">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h2>
            <p className="text-gray-600 mb-6">
              더 많은 콘텐츠와 기능을 이용하려면 로그인해주세요
            </p>
            <Link
              href="/auth/login"
              className="block w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
            >
              로그인
            </Link>
            <Link
              href="/auth/signup"
              className="block w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              회원가입
            </Link>
          </div>
        </div>

        {/* 기능 안내 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">✉️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">초대 코드로 가입</h3>
            <p className="text-sm text-gray-600">
              초대 코드가 있으시다면 간편하게 가입하실 수 있습니다
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">민감 콘텐츠</h3>
            <p className="text-sm text-gray-600">
              2차 인증 후 전문 콘텐츠에 접근하실 수 있습니다
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">프리미엄 구독</h3>
            <p className="text-sm text-gray-600">
              프리미엄 콘텐츠와 전문가 상담을 이용하세요
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">💚</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">커뮤니티</h3>
            <p className="text-sm text-gray-600">
              다른 회원들과 건강 정보를 공유하세요
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 로그인한 경우
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">내 정보</h1>
        <p className="text-gray-600">계정 설정 및 구독 관리</p>
      </div>

      {/* 사용자 정보 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
            {user.role === 'guest' && '게스트'}
            {user.role === 'member' && '일반 회원'}
            {user.role === 'verified' && '인증 회원'}
            {user.role === 'premium' && '프리미엄 회원'}
          </span>
          {user.isInvited && (
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
              ✓ 초대 가입
            </span>
          )}
        </div>

        {user.subscription && (
          <div className="border-t pt-4 mt-4">
            <p className="text-sm text-gray-600">
              구독 플랜: <span className="font-medium text-gray-900">{user.subscription.type}</span>
            </p>
            <p className="text-sm text-gray-600">
              만료일: <span className="font-medium text-gray-900">{user.subscription.expiresAt}</span>
            </p>
          </div>
        )}
      </div>

      {/* 메뉴 */}
      <div className="space-y-3">
        <Link
          href="/profile/edit"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✏️</span>
              <span className="font-medium text-gray-900">프로필 수정</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </Link>

        {user.role === 'guest' && (
          <Link
            href="/profile/verify"
            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <div className="font-medium text-gray-900">2차 인증하기</div>
                  <div className="text-xs text-gray-500">민감 콘텐츠 접근</div>
                </div>
              </div>
              <span className="text-gray-400">›</span>
            </div>
          </Link>
        )}

        {!user.subscription && (
          <Link
            href="/subscription"
            className="block bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 hover:from-blue-600 hover:to-blue-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="font-medium text-white">프리미엄 구독</div>
                  <div className="text-xs text-blue-100">모든 콘텐츠 무제한</div>
                </div>
              </div>
              <span className="text-white">›</span>
            </div>
          </Link>
        )}

        <Link
          href="/profile/bookmarks"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⭐</span>
              <span className="font-medium text-gray-900">내 북마크</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </Link>

        <Link
          href="/profile/history"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📚</span>
              <span className="font-medium text-gray-900">시청 기록</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </Link>

        <Link
          href="/profile/settings"
          className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚙️</span>
              <span className="font-medium text-gray-900">설정</span>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
