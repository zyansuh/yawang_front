# 🚀 야왕 MVP 개발 로드맵

## ✅ 완료
- [x] 프로젝트 초기 구조 (Next.js + TypeScript + Tailwind)
- [x] 기본 페이지 구조 (홈, 카테고리, 콘텐츠 상세, 북마크, 프로필)
- [x] 네비게이션 (헤더, 하단 탭)
- [x] 카테고리 3단 계층 구조
- [x] 반응형 레이아웃

---

## 🔄 진행 중

### 1단계: 인증 시스템 (최우선)
- [ ] 회원가입/로그인 UI
  - [ ] 이메일 회원가입 폼
  - [ ] 로그인 폼
  - [ ] 비밀번호 찾기
- [ ] 소셜 로그인
  - [ ] Google 로그인
  - [ ] Kakao 로그인
  - [ ] Naver 로그인
- [ ] 로그인 상태 관리 (Context API)
- [ ] 초대 코드 시스템
  - [ ] 초대 코드 입력 UI
  - [ ] 초대 코드 검증 (API 준비)
- [ ] API 연동 준비 (주석 처리)

### 2단계: 권한 및 보안
- [ ] 권한별 콘텐츠 접근 제어
  - [ ] 비로그인: Base 콘텐츠만
  - [ ] 로그인: Base + Member 콘텐츠
  - [ ] 인증 완료: Verified 콘텐츠
  - [ ] 구독: Premium 콘텐츠
- [ ] 2차 인증 (SMS)
  - [ ] 인증 요청 UI
  - [ ] 인증 코드 입력
  - [ ] API 연동 준비 (주석)
- [ ] Protected Route 설정

### 3단계: 핵심 기능
- [ ] 북마크 기능
  - [ ] 북마크 추가/제거
  - [ ] 북마크 목록 페이지
  - [ ] LocalStorage 저장 (임시)
- [ ] 검색 기능
  - [ ] 검색 UI
  - [ ] 카테고리 검색
  - [ ] 콘텐츠 검색
  - [ ] 검색 결과 페이지
- [ ] 콘텐츠 조회수/좋아요
  - [ ] 조회수 카운트
  - [ ] 좋아요 기능

### 4단계: 구독 시스템
- [ ] 구독 플랜 페이지
  - [ ] Basic vs Premium 비교
  - [ ] 가격 정보
- [ ] 구독 신청 UI
- [ ] 결제 연동 준비 (주석)
  - [ ] Toss Payments
  - [ ] 또는 Iamport
- [ ] 구독 상태 표시

### 5단계: 사용자 경험 개선
- [ ] 프로필 페이지 완성
  - [ ] 내 정보 수정
  - [ ] 비밀번호 변경
  - [ ] 구독 정보
  - [ ] 내가 본 콘텐츠 히스토리
- [ ] 알림 기능
  - [ ] 알림 센터
  - [ ] 새 콘텐츠 알림
- [ ] 다크 모드
- [ ] 폰트 크기 조절 (접근성)

### 6단계: 콘텐츠 관리
- [ ] 콘텐츠 상세 개선
  - [ ] 영상 플레이어 (YouTube/Vimeo)
  - [ ] 이미지 갤러리
  - [ ] 단계별 안내 개선
- [ ] 연관 콘텐츠 추천
- [ ] 댓글 시스템 (선택)
- [ ] 공유 기능

### 7단계: 관리자 기능 (기본)
- [ ] 관리자 로그인
- [ ] 콘텐츠 CRUD
  - [ ] 글 작성/수정/삭제
  - [ ] 카테고리 관리
- [ ] 회원 관리
  - [ ] 회원 목록
  - [ ] 권한 변경
  - [ ] 초대 코드 발급

### 8단계: 성능 최적화
- [ ] 이미지 최적화
- [ ] SEO 설정
- [ ] 로딩 스피너
- [ ] 에러 바운더리
- [ ] 404 페이지

---

## 📝 API 엔드포인트 준비 목록

### 인증
```typescript
// POST /api/auth/signup - 회원가입
// POST /api/auth/login - 로그인
// POST /api/auth/logout - 로그아웃
// POST /api/auth/social/google - Google 소셜 로그인
// POST /api/auth/social/kakao - Kakao 소셜 로그인
// POST /api/auth/social/naver - Naver 소셜 로그인
// POST /api/auth/verify-invite - 초대 코드 검증
// POST /api/auth/sms/request - SMS 인증 요청
// POST /api/auth/sms/verify - SMS 인증 확인
```

### 사용자
```typescript
// GET /api/user/me - 내 정보 조회
// PATCH /api/user/me - 내 정보 수정
// GET /api/user/bookmarks - 북마크 목록
// POST /api/user/bookmarks - 북마크 추가
// DELETE /api/user/bookmarks/:id - 북마크 삭제
```

### 콘텐츠
```typescript
// GET /api/posts - 콘텐츠 목록 (필터/검색)
// GET /api/posts/:id - 콘텐츠 상세
// POST /api/posts/:id/view - 조회수 증가
// POST /api/posts/:id/like - 좋아요
// GET /api/categories - 카테고리 목록
```

### 구독
```typescript
// GET /api/subscription/plans - 구독 플랜 목록
// POST /api/subscription/subscribe - 구독 신청
// POST /api/subscription/cancel - 구독 취소
// GET /api/subscription/status - 구독 상태 조회
```

---

## 🎯 이번 작업 목표

**1단계: 인증 시스템 완성**
- 회원가입/로그인 UI
- 소셜 로그인 연동 준비
- 로그인 상태 관리
- 초대 코드 시스템 UI
