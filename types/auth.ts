// 로그인 폼 데이터
export interface LoginFormData {
  email: string;
  password: string;
}

// 회원가입 폼 데이터
export interface SignupFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  inviteCode?: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing?: boolean;
}

// 소셜 로그인 제공자
export type SocialProvider = 'google' | 'kakao' | 'naver';

// 인증 응답 (API 연동 시 사용)
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'guest' | 'member' | 'verified' | 'premium';
    isInvited: boolean;
  };
  token: string;
}

// 초대 코드 검증 요청
export interface InviteCodeRequest {
  code: string;
}

// SMS 인증 요청
export interface SmsVerifyRequest {
  phone: string;
  code: string;
}
