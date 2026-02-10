import { Category, Post } from '@/types';

// MVP용 카테고리 데이터
export const categories: Category[] = [
  {
    id: 'pain',
    title: '통증 관리',
    order: 1,
    visibility: 'public',
    icon: '🩹',
    description: '부위별 통증 관리 방법'
  },
  {
    id: 'pain-knee',
    parentId: 'pain',
    title: '무릎 통증',
    order: 1,
    visibility: 'public',
    icon: '🦵'
  },
  {
    id: 'pain-back',
    parentId: 'pain',
    title: '허리 통증',
    order: 2,
    visibility: 'public',
    icon: '🏃'
  },
  {
    id: 'pain-shoulder',
    parentId: 'pain',
    title: '어깨 통증',
    order: 3,
    visibility: 'public',
    icon: '💪'
  },
  {
    id: 'exercise',
    title: '운동',
    order: 2,
    visibility: 'public',
    icon: '🏋️',
    description: '건강 유지를 위한 운동법'
  },
  {
    id: 'exercise-stretch',
    parentId: 'exercise',
    title: '스트레칭',
    order: 1,
    visibility: 'public',
    icon: '🧘'
  },
  {
    id: 'exercise-rehab',
    parentId: 'exercise',
    title: '재활 운동',
    order: 2,
    visibility: 'member',
    icon: '🤸'
  },
  {
    id: 'health',
    title: '건강 정보',
    order: 3,
    visibility: 'public',
    icon: '💚',
    description: '일상 건강 관리 팁'
  },
  {
    id: 'health-basic',
    parentId: 'health',
    title: '기본 지식',
    order: 1,
    visibility: 'public',
    icon: '📚'
  },
  {
    id: 'health-life',
    parentId: 'health',
    title: '생활 관리',
    order: 2,
    visibility: 'public',
    icon: '🏡'
  },
  {
    id: 'sensitive',
    title: '전문 콘텐츠',
    order: 4,
    visibility: 'verified',
    icon: '🔒',
    description: '인증 회원 전용'
  },
  {
    id: 'sensitive-advanced',
    parentId: 'sensitive',
    title: '심화 운동법',
    order: 1,
    visibility: 'verified',
    icon: '💪'
  },
  {
    id: 'premium',
    title: '프리미엄',
    order: 5,
    visibility: 'premium',
    icon: '⭐',
    description: '프리미엄 회원 전용'
  },
];

// MVP용 샘플 포스트
export const posts: Post[] = [
  {
    id: '1',
    categoryId: 'pain-knee',
    title: '무릎 통증 완화를 위한 3가지 스트레칭',
    summary: '하루 10분으로 무릎 통증을 줄일 수 있는 간단한 스트레칭 방법을 알려드립니다.',
    body: '상세 내용...',
    tags: ['무릎', '스트레칭', '통증완화'],
    level: 'base',
    isSensitive: false,
    thumbnail: '/images/knee-stretch.jpg',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    categoryId: 'pain-back',
    title: '허리 디스크 예방 운동법',
    summary: '올바른 자세와 간단한 운동으로 허리 건강을 지키는 방법을 소개합니다.',
    body: '상세 내용...',
    tags: ['허리', '디스크', '예방'],
    level: 'base',
    isSensitive: false,
    thumbnail: '/images/back-exercise.jpg',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14'
  },
  {
    id: '3',
    categoryId: 'exercise-stretch',
    title: '아침 기상 후 5분 스트레칭',
    summary: '침대에서 바로 할 수 있는 아침 스트레칭으로 하루를 활기차게 시작하세요.',
    body: '상세 내용...',
    tags: ['아침', '스트레칭', '간단'],
    level: 'base',
    isSensitive: false,
    thumbnail: '/images/morning-stretch.jpg',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13'
  },
  {
    id: '4',
    categoryId: 'sensitive-advanced',
    title: '[인증 필요] 전문 재활 운동 프로그램',
    summary: '전문가 검증을 거친 심화 재활 운동 프로그램입니다.',
    body: '상세 내용...',
    tags: ['재활', '전문', '심화'],
    level: 'verified',
    isSensitive: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: '5',
    categoryId: 'premium',
    title: '[프리미엄] 1:1 맞춤 운동 컨설팅',
    summary: '전문 트레이너의 맞춤형 운동 프로그램을 받아보세요.',
    body: '상세 내용...',
    tags: ['맞춤', '프리미엄', '전문가'],
    level: 'premium',
    isSensitive: false,
    createdAt: '2024-01-11',
    updatedAt: '2024-01-11'
  },
];

// 유틸리티 함수
export const getTopCategories = () => {
  return categories.filter(cat => !cat.parentId);
};

export const getSubCategories = (parentId: string) => {
  return categories.filter(cat => cat.parentId === parentId);
};

export const getCategoryById = (id: string) => {
  return categories.find(cat => cat.id === id);
};

export const getPostsByCategory = (categoryId: string) => {
  return posts.filter(post => post.categoryId === categoryId);
};
