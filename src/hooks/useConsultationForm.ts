import { useEffect, useRef, useState, type FormEvent } from 'react';

import {
  normalizeBirth,
  calculateAge,
  buildConsultationPayload,
  validPhone,
  validName,
  readSubmissionLimit,
  registerSubmission,
  SUBMISSION_SESSION_KEY,
} from '@/lib/consultation';

import { ConsultationError, submitConsultation } from '@/lib/sheets';

// 화면은 이 훅만 사용합니다. 입력 검사와 실제 전송은 각각 공통 모듈이 담당합니다.
export function useConsultationForm() {
  // 1. 화면 상태와 중복 클릭 방지
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [name, setName] = useState('');
  const composingName = useRef(false);
  const pendingRequest = useRef<{ id: string; fingerprint: string } | null>(null);
  const sending = useRef(false);
  // 2. 반복 접수 제한: 화면 표시나 서버 연결을 기다리게 하지 않습니다.
  const limit = useRef({ attempts: [] as number[], blockedUntil: 0 });
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    limit.current = readSubmissionLimit();
    setRemaining(Math.max(0, Math.ceil((limit.current.blockedUntil - Date.now()) / 1000)));
  }, []);
  const isBlocked = remaining > 0;
  useEffect(() => {
    if (!isBlocked) return;
    const timer = window.setInterval(
      () => setRemaining(Math.max(0, Math.ceil((limit.current.blockedUntil - Date.now()) / 1000))),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [isBlocked]);
  // 3. 입력값과 생년월일 검사
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const completeBirth = (input: HTMLInputElement) => {
    const normalized = normalizeBirth(input.value);
    input.value = normalized;
    setBirth(normalized);
    setAge(null);
    input.setCustomValidity(
      normalized && calculateAge(normalized) === null
        ? '올바른 생년월일을 6자리 또는 8자리 숫자로 입력해주세요.'
        : '',
    );
  };

  // 4. 검사 → 동일 요청번호 유지 → 전송 → 저장 응답 확인
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending.current || limit.current.blockedUntil > Date.now()) return;
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    nameInput.setCustomValidity(
      validName(nameInput.value)
        ? ''
        : '이름은 완성된 한글 또는 영문 2~40자로 입력해주세요. 비속어는 사용할 수 없습니다.',
    );
    const phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
    phoneInput.setCustomValidity(
      validPhone(phoneInput.value) ? '' : '지역번호를 포함한 올바른 전화번호를 입력해주세요.',
    );
    completeBirth(form.elements.namedItem('birth') as HTMLInputElement);
    if (!form.reportValidity()) return;
    limit.current = registerSubmission(limit.current);
    try {
      sessionStorage.setItem(SUBMISSION_SESSION_KEY, JSON.stringify(limit.current));
    } catch {
      /* Keep the in-memory limit if storage is unavailable. */
    }
    setRemaining(Math.max(0, Math.ceil((limit.current.blockedUntil - Date.now()) / 1000)));
    const payload = buildConsultationPayload(form);
    setAge(payload.age);
    const fingerprint = JSON.stringify(payload);
    if (pendingRequest.current?.fingerprint !== fingerprint) {
      pendingRequest.current = { id: crypto.randomUUID(), fingerprint };
    }
    sending.current = true;
    setStatus('submitting');
    setFormError('');
    try {
      await submitConsultation(payload, pendingRequest.current.id);
      pendingRequest.current = null;
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setFormError(
        error instanceof ConsultationError
          ? error.message
          : '저장 결과를 확인하지 못했습니다. 잠시 후 같은 내용으로 다시 시도해주세요. 이미 저장된 요청은 중복 접수하지 않습니다.',
      );
    } finally {
      sending.current = false;
    }
  };

  return {
    status,
    setStatus,
    formError,
    name,
    setName,
    composingName,
    remaining,
    phone,
    setPhone,
    birth,
    setBirth,
    gender,
    setGender,
    age,
    setAge,
    completeBirth,
    handleSubmit,
  };
}
