// 카테고리 타입
export interface Category {
  id: string;
  parentId?: string;
  title: string;
  order: number;
  visibility: 'public' | 'member' | 'verified' | 'premium';
  icon?: string;
  description?: string;
}

// 콘텐츠 타입
export interface Post {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  body: string;
  tags: string[];
  level: 'base' | 'verified' | 'premium';
  isSensitive: boolean;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

// 유저 권한 타입
export type UserRole = 'guest' | 'member' | 'verified' | 'premium';

// 유저 타입
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isInvited: boolean;
  subscription?: {
    type: 'basic' | 'premium';
    expiresAt: string;
  };
}
