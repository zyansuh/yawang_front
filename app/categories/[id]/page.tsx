'use client';

import { use } from 'react';
import CategoryCard from '@/components/CategoryCard';
import PostCard from '@/components/PostCard';
import { getCategoryById, getSubCategories, getPostsByCategory } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const category = getCategoryById(id);

  if (!category) {
    notFound();
  }

  // 권한 체크
  const roleLevel: Record<UserRole | 'guest', number> = {
    guest: 0,
    member: 1,
    verified: 2,
    premium: 3,
  };

  const userLevel = roleLevel[user?.role || 'guest'];
  const requiredLevel = roleLevel[
    category.visibility === 'public' ? 'guest' :
    category.visibility === 'member' ? 'member' :
    category.visibility === 'verified' ? 'verified' : 'premium'
  ];

  const hasAccess = userLevel >= requiredLevel;

  const subCategories = getSubCategories(id);
  const posts = getPostsByCategory(id);

  // 권한 없음 화면
  if (!hasAccess) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md mx-auto">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">접근 권한이 없습니다</h2>
          <p className="text-gray-600 mb-6">
            이 카테고리는{' '}
            {category.visibility === 'member' && '로그인한 회원'}
            {category.visibility === 'verified' && '인증 회원'}
            {category.visibility === 'premium' && '프리미엄 회원'}만 볼 수 있습니다.
          </p>
          {!user && (
            <button
              onClick={() => router.push('/auth/login')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
            >
              로그인하기
            </button>
          )}
          {user && category.visibility === 'verified' && (
            <button
              onClick={() => router.push('/profile/verify')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
            >
              2차 인증하기
            </button>
          )}
          {user && category.visibility === 'premium' && (
            <button
              onClick={() => router.push('/subscription')}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
            >
              프리미엄 구독하기
            </button>
          )}
          <button
            onClick={() => router.push('/categories')}
            className="w-full py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            카테고리로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* 브레드크럼 */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">홈</Link>
        <span className="mx-2">›</span>
        <Link href="/categories" className="hover:text-blue-600">카테고리</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 font-medium">{category.title}</span>
      </div>

      {/* 카테고리 헤더 */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-2">
          <span className="text-5xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category.title}</h1>
            {category.description && (
              <p className="text-gray-600 mt-1">{category.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* 하위 카테고리 */}
      {subCategories.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">세부 카테고리</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subCategories.map((subCat) => (
              <CategoryCard key={subCat.id} category={subCat} />
            ))}
          </div>
        </section>
      )}

      {/* 콘텐츠 목록 */}
      {posts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">콘텐츠</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* 빈 상태 */}
      {subCategories.length === 0 && posts.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">아직 콘텐츠가 없습니다</h3>
          <p className="text-gray-600">곧 유익한 정보를 제공해드릴게요!</p>
        </div>
      )}
    </div>
  );
}
