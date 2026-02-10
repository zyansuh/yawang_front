import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/lib/data';

export default function CategoriesPage() {
  const topCategories = categories.filter(cat => !cat.parentId);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">전체 카테고리</h1>
        <p className="text-gray-600">원하시는 주제를 선택해주세요</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
