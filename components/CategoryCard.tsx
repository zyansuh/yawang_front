import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
        <div className="flex flex-col items-center space-y-3">
          <div className="text-5xl">
            {category.icon || '📁'}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {category.title}
            </h3>
            {category.description && (
              <p className="text-sm text-gray-500">
                {category.description}
              </p>
            )}
          </div>
          {category.visibility !== 'public' && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
              {category.visibility === 'member' && '회원 전용'}
              {category.visibility === 'verified' && '인증 필요'}
              {category.visibility === 'premium' && '프리미엄'}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
