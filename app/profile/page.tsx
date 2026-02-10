export default function ProfilePage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">내 정보</h1>
        <p className="text-gray-600">계정 설정 및 구독 관리</p>
      </div>

      {/* 로그인 안내 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-600 mb-6">
            더 많은 콘텐츠와 기능을 이용하려면 로그인해주세요
          </p>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
            로그인
          </button>
          <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            회원가입
          </button>
        </div>
      </div>

      {/* 기능 안내 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="text-3xl mb-3">✉️</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">초대 코드로 가입</h3>
          <p className="text-sm text-gray-600">
            초대 코드가 있으시다면 간편하게 가입하실 수 있습니다
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">민감 콘텐츠</h3>
          <p className="text-sm text-gray-600">
            2차 인증 후 전문 콘텐츠에 접근하실 수 있습니다
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="text-3xl mb-3">⭐</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">프리미엄 구독</h3>
          <p className="text-sm text-gray-600">
            프리미엄 콘텐츠와 전문가 상담을 이용하세요
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="text-3xl mb-3">💚</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">커뮤니티</h3>
          <p className="text-sm text-gray-600">
            다른 회원들과 건강 정보를 공유하세요
          </p>
        </div>
      </div>
    </div>
  );
}
