import CategoryCard from '@/components/CategoryCard';
import PostCard from '@/components/PostCard';
import { getCategoryById, getSubCategories, getPostsByCategory } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryById(id);

  if (!category) {
    notFound();
  }

  const subCategories = getSubCategories(id);
  const posts = getPostsByCategory(id);

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
