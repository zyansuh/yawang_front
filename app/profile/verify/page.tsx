'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import SmsVerifyModal from '@/components/SmsVerifyModal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  if (user.role !== 'member' && user.role !== 'guest') {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">이미 인증 완료</h2>
          <p className="text-gray-600 mb-6">
            이미 2차 인증이 완료된 계정입니다.
          </p>
          <Link
            href="/profile"
            className="block w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            프로필로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">2차 인증</h1>
        <p className="text-gray-600">민감 콘텐츠 접근을 위한 휴대폰 인증</p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* 인증 안내 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">2차 인증이 필요합니다</h2>
            <p className="text-gray-600">
              민감 콘텐츠를 보시려면 휴대폰 인증을 진행해주세요
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
          >
            휴대폰 인증 시작하기
          </button>
        </div>

        {/* 혜택 안내 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">인증 후 이용 가능한 콘텐츠</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <div className="font-medium text-gray-900">전문 건강 콘텐츠</div>
                <div className="text-sm text-gray-600">의학 전문가가 검증한 심화 정보</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <div className="font-medium text-gray-900">맞춤형 운동법</div>
                <div className="text-sm text-gray-600">개인 상태에 맞는 운동 프로그램</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <div className="font-medium text-gray-900">커뮤니티 참여</div>
                <div className="text-sm text-gray-600">다른 회원들과 경험 공유</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SMS 인증 모달 */}
      <SmsVerifyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          router.push('/profile');
        }}
      />
    </div>
  );
}
