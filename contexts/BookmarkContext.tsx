'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BookmarkContextType {
  bookmarks: string[];
  isBookmarked: (postId: string) => boolean;
  addBookmark: (postId: string) => void;
  removeBookmark: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // 초기화: 로컬스토리지에서 북마크 로드
  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  // 북마크 변경 시 로컬스토리지에 저장
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (postId: string) => {
    return bookmarks.includes(postId);
  };

  const addBookmark = (postId: string) => {
    if (!bookmarks.includes(postId)) {
      setBookmarks([...bookmarks, postId]);
      
      // TODO: API 연동
      // fetch('/api/user/bookmarks', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ postId }),
      // });
    }
  };

  const removeBookmark = (postId: string) => {
    setBookmarks(bookmarks.filter(id => id !== postId));
    
    // TODO: API 연동
    // fetch(`/api/user/bookmarks/${postId}`, {
    //   method: 'DELETE',
    // });
  };

  const toggleBookmark = (postId: string) => {
    if (isBookmarked(postId)) {
      removeBookmark(postId);
    } else {
      addBookmark(postId);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmark는 BookmarkProvider 내에서 사용해야 합니다');
  }
  return context;
}
