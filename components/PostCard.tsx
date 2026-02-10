import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
        {post.thumbnail && (
          <div className="aspect-video bg-gray-200 relative">
            {/* 이미지가 있을 경우 표시 */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              📸
            </div>
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {post.summary}
          </p>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
            <span>{post.createdAt}</span>
            {post.level !== 'base' && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
                {post.level === 'verified' && '인증'}
                {post.level === 'premium' && '프리미엄'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
