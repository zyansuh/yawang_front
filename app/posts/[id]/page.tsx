'use client';

import { use } from 'react';
import { posts, getCategoryById } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import BookmarkButton from '@/components/BookmarkButton';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  const category = getCategoryById(post.categoryId);

  // 권한 체크
  const roleLevel: Record<UserRole | 'guest', number> = {
    guest: 0,
    member: 1,
    verified: 2,
    premium: 3,
  };

  const userLevel = roleLevel[user?.role || 'guest'];
  const requiredLevel = roleLevel[
    post.level === 'base' ? 'guest' :
    post.level === 'verified' ? 'verified' : 'premium'
  ];

  const hasAccess = userLevel >= requiredLevel;

  // 권한 없음 화면
  if (!hasAccess) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h2>
          <p className="text-gray-600 mb-6">
            이 콘텐츠는{' '}
            {post.level === 'verified' && '인증 회원'}
            {post.level === 'premium' && '프리미엄 회원'}만 볼 수 있습니다.
          </p>
          {!user && (
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
            >
              로그인하기
            </button>
          )}
          {user && post.level === 'verified' && (
            <button
              onClick={() => router.push('/profile/verify')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
            >
              2차 인증하기
            </button>
          )}
          {user && post.level === 'premium' && (
            <button
              onClick={() => router.push('/subscription')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
            >
              프리미엄 구독하기
            </button>
          )}
          <button
            onClick={() => router.back()}
            className="w-full py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            뒤로 가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* 브레드크럼 */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">홈</Link>
        <span className="mx-2">›</span>
        <Link href="/categories" className="hover:text-blue-600">카테고리</Link>
        {category && (
          <>
            <span className="mx-2">›</span>
            <Link href={`/categories/${category.id}`} className="hover:text-blue-600">
              {category.title}
            </Link>
          </>
        )}
      </div>

      {/* 콘텐츠 헤더 */}
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 썸네일 */}
        {post.thumbnail && (
          <div className="aspect-video bg-gray-200 flex items-center justify-center text-6xl">
            📸
          </div>
        )}

        <div className="p-8">
          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 제목 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* 메타 정보 */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
            <span>📅 {post.createdAt}</span>
            {post.level !== 'base' && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
                {post.level === 'verified' && '✓ 인증 필요'}
                {post.level === 'premium' && '⭐ 프리미엄'}
              </span>
            )}
          </div>

          {/* 요약 */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2">💡 3줄 요약</h2>
            <p className="text-gray-700 leading-relaxed">{post.summary}</p>
          </div>

          {/* 본문 */}
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.body}
            </div>

            {/* 본문 플레이스홀더 */}
            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 시작하기 전에</h2>
                <p className="text-gray-700 leading-relaxed">
                  이 운동을 시작하기 전, 반드시 전문의와 상담하시는 것을 권장드립니다. 
                  무리한 운동은 오히려 건강에 해로울 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 준비물</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>운동하기 편한 복장</li>
                  <li>요가 매트 (선택사항)</li>
                  <li>물</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">🔄 단계별 안내</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2">1단계</h3>
                    <p className="text-gray-700">첫 번째 동작에 대한 설명입니다.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2">2단계</h3>
                    <p className="text-gray-700">두 번째 동작에 대한 설명입니다.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2">3단계</h3>
                    <p className="text-gray-700">세 번째 동작에 대한 설명입니다.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">⚠️ 주의사항</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    통증이 느껴지면 즉시 중단하세요. 
                    규칙적으로 꾸준히 하는 것이 중요하며, 하루에 너무 많이 하지 마세요.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="mt-8 pt-6 border-t flex gap-3">
            <BookmarkButton postId={post.id} className="flex-1" />
            <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              📤 공유
            </button>
          </div>
        </div>
      </article>

      {/* 연관 콘텐츠 */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 연관 콘텐츠</h2>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-gray-600 text-center py-8">
            관련된 다른 콘텐츠를 준비 중입니다
          </p>
        </div>
      </section>
    </div>
  );
}
