import CategoryCard from '@/components/CategoryCard';
import PostCard from '@/components/PostCard';
import { getTopCategories, posts } from '@/lib/data';

export default function Home() {
  const topCategories = getTopCategories();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* 환영 배너 */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">야왕에 오신 것을 환영합니다</h1>
          <p className="text-blue-100 text-lg">
            건강한 삶을 위한 지식을 쉽고 편하게
          </p>
        </div>
      </section>

      {/* 주요 카테고리 */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">주요 카테고리</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 최근 콘텐츠 */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">최근 콘텐츠</h2>
          <a href="/posts" className="text-blue-600 text-sm font-medium hover:underline">
            더보기 →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 추천 섹션 */}
      <section className="mb-10">
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">💡 오늘의 건강 팁</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🌅</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">아침 스트레칭</h3>
                <p className="text-sm text-gray-600">
                  기상 직후 5분 스트레칭으로 하루를 시작하세요
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💧</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">수분 섭취</h3>
                <p className="text-sm text-gray-600">
                  하루 8잔의 물을 마시는 습관을 들이세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
