'use client';

import { useBookmark } from '@/contexts/BookmarkContext';
import { posts } from '@/lib/data';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export default function BookmarksPage() {
  const { bookmarks } = useBookmark();

  const bookmarkedPosts = posts.filter(post => bookmarks.includes(post.id));

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">북마크</h1>
        <p className="text-gray-600">
          저장한 콘텐츠 {bookmarkedPosts.length}개
        </p>
      </div>

      {bookmarkedPosts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">저장된 콘텐츠가 없습니다</h3>
          <p className="text-gray-600 mb-6">마음에 드는 콘텐츠를 북마크해보세요</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            콘텐츠 둘러보기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarkedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
