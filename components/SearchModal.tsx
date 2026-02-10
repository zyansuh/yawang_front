'use client';

import { useState, useEffect } from 'react';
import { useSearch } from '@/contexts/SearchContext';
import { categories, posts } from '@/lib/data';
import Link from 'next/link';

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    categories: typeof categories;
    posts: typeof posts;
  }>({ categories: [], posts: [] });

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    
    if (isSearchOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen, closeSearch]);

  // 검색
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults({ categories: [], posts: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();

    const filteredCategories = categories.filter(cat => 
      cat.title.toLowerCase().includes(lowerQuery) ||
      cat.description?.toLowerCase().includes(lowerQuery)
    );

    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.summary.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );

    setSearchResults({
      categories: filteredCategories,
      posts: filteredPosts,
    });
  }, [query]);

  const handleClose = () => {
    closeSearch();
    setQuery('');
    setSearchResults({ categories: [], posts: [] });
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="bg-white h-full md:h-auto md:max-h-[80vh] md:mt-20 md:mx-auto md:max-w-2xl md:rounded-2xl shadow-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 검색 헤더 */}
        <div className="p-4 border-b flex items-center gap-3">
          <span className="text-2xl">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="카테고리, 콘텐츠 검색..."
            className="flex-1 text-lg outline-none"
            autoFocus
          />
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* 검색 결과 */}
        <div className="flex-1 overflow-y-auto">
          {!query.trim() ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg mb-2">검색어를 입력하세요</p>
              <p className="text-sm">카테고리, 콘텐츠, 태그로 검색할 수 있습니다</p>
            </div>
          ) : searchResults.categories.length === 0 && searchResults.posts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg mb-2">검색 결과가 없습니다</p>
              <p className="text-sm">다른 검색어로 시도해보세요</p>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* 카테고리 결과 */}
              {searchResults.categories.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-500 mb-3">카테고리</h3>
                  <div className="space-y-2">
                    {searchResults.categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                        onClick={handleClose}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{category.title}</div>
                            {category.description && (
                              <div className="text-sm text-gray-500">{category.description}</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 콘텐츠 결과 */}
              {searchResults.posts.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-500 mb-3">콘텐츠</h3>
                  <div className="space-y-2">
                    {searchResults.posts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/posts/${post.id}`}
                        onClick={handleClose}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900 mb-1">{post.title}</div>
                        <div className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {post.summary}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
