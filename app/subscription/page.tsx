'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function SubscriptionPage() {
  const { user } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '무료',
      features: [
        '기본 건강 정보',
        '일반 운동법',
        '카테고리별 콘텐츠',
        '커뮤니티 읽기',
      ],
      current: !user?.subscription,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '월 9,900원',
      features: [
        'Basic의 모든 기능',
        '전문 건강 콘텐츠',
        '맞춤형 운동 프로그램',
        '영상 강의 무제한',
        '전문가 Q&A',
        '광고 제거',
      ],
      highlight: true,
      current: user?.subscription?.type === 'premium',
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">구독 플랜</h1>
        <p className="text-gray-600">나에게 맞는 플랜을 선택하세요</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-2xl shadow-sm border-2 p-8 ${
              plan.highlight
                ? 'border-blue-500 relative'
                : 'border-gray-100'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                추천
              </div>
            )}

            {plan.current && (
              <div className="mb-4">
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  현재 플랜
                </span>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
              <div className="text-3xl font-bold text-blue-600">{plan.price}</div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {!plan.current && (
              <button
                onClick={() => {
                  if (!user) {
                    alert('로그인이 필요합니다.');
                    return;
                  }
                  // TODO: 결제 연동
                  alert('결제 기능 준비 중입니다.');
                }}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.highlight
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {plan.id === 'basic' ? '무료로 시작하기' : '구독하기'}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">자주 묻는 질문</h2>
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">언제든 취소할 수 있나요?</h3>
            <p className="text-gray-600">
              네, 언제든지 구독을 취소하실 수 있습니다. 취소 후에도 결제일까지는 프리미엄 혜택을 이용하실 수 있습니다.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">결제 방법은 무엇인가요?</h3>
            <p className="text-gray-600">
              신용카드, 체크카드, 계좌이체 등 다양한 결제 수단을 지원합니다.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">환불이 가능한가요?</h3>
            <p className="text-gray-600">
              이용하지 않은 기간에 대해서는 일할 계산하여 환불해드립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
