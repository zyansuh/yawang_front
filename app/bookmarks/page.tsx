export default function BookmarksPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">북마크</h1>
        <p className="text-gray-600">저장한 콘텐츠를 확인하세요</p>
      </div>

      <div className="text-center py-20">
        <div className="text-6xl mb-4">⭐</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">저장된 콘텐츠가 없습니다</h3>
        <p className="text-gray-600 mb-6">마음에 드는 콘텐츠를 북마크해보세요</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          콘텐츠 둘러보기
        </a>
      </div>
    </div>
  );
}
