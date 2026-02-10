'use client';

import { useBookmark } from '@/contexts/BookmarkContext';
import { useAuth } from '@/contexts/AuthContext';

interface BookmarkButtonProps {
  postId: string;
  className?: string;
}

export default function BookmarkButton({ postId, className = '' }: BookmarkButtonProps) {
  const { user } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmark();

  const handleClick = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    toggleBookmark(postId);
  };

  const bookmarked = isBookmarked(postId);

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
        bookmarked
          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } ${className}`}
    >
      <span className="text-xl">{bookmarked ? '⭐' : '☆'}</span>
      <span>{bookmarked ? '북마크 해제' : '북마크'}</span>
    </button>
  );
}
