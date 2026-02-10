'use client';

import { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '@/contexts/AuthContext';

interface SmsVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SmsVerifyModal({ isOpen, onClose, onSuccess }: SmsVerifyModalProps) {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(180); // 3분
  const [isTimerActive, setIsTimerActive] = useState(false);

  // 타이머
  useState(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: API 연동
      // await fetch('/api/auth/sms/request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phone }),
      // });

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStep('code');
      setTimer(180);
      setIsTimerActive(true);
      alert('인증 코드가 전송되었습니다. (Mock)');
    } catch (err) {
      setError('인증 코드 전송에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: API 연동
      // await fetch('/api/auth/sms/verify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phone, code }),
      // });

      await new Promise(resolve => setTimeout(resolve, 1000));

      // 사용자 권한 업그레이드
      if (user) {
        updateUser({
          ...user,
          role: 'verified',
        });
      }

      alert('2차 인증이 완료되었습니다!');
      handleClose();
      onSuccess?.();
    } catch (err) {
      setError('인증 코드가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    // 상태 초기화
    setTimeout(() => {
      setStep('phone');
      setPhone('');
      setCode('');
      setError('');
      setTimer(180);
      setIsTimerActive(false);
    }, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="2차 인증 (SMS)">
      {step === 'phone' ? (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              민감 콘텐츠에 접근하려면 휴대폰 인증이 필요합니다.
            </p>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              휴대폰 번호
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01012345678"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? '전송 중...' : '인증 코드 받기'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>{phone}</strong>로 전송된 인증 코드를 입력하세요.
            </p>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="code" className="text-sm font-medium text-gray-700">
                인증 코드
              </label>
              {isTimerActive && (
                <span className="text-sm font-medium text-blue-600">
                  {formatTime(timer)}
                </span>
              )}
            </div>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6자리 숫자"
              maxLength={6}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <button
              type="submit"
              disabled={isLoading || !isTimerActive}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? '확인 중...' : '인증 완료'}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setStep('phone');
                setCode('');
                setError('');
              }}
              className="w-full py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              번호 다시 입력
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
