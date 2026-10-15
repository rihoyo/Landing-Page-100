import { useState } from 'react';
import { useConsultationForm } from '@/hooks/useConsultationForm';
import { cleanName, digitsOnly } from '@/lib/consultation';
import { asset } from './assets';

// 두 신청 화면이 기존 공통 검증·전송·중복 제한 모듈을 사용합니다.
export default function CancerForm({ suffix }: { suffix: string }) {
  const f = useConsultationForm();
  const [prefix, setPrefix] = useState('010');
  const [number, setNumber] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const id = (name: string) => `cancer-${suffix}-${name}`;
  return (
    <>
      {f.status === 'success' ? (
        <div className="cancer-success" role="status">
          <h5>상담 신청이 완료되었습니다.</h5>
          <p>담당 상담사가 남겨주신 연락처로 연락드립니다.</p>
          <button type="button" onClick={() => f.setStatus('idle')}>
            다시 입력하기
          </button>
        </div>
      ) : (
        <form data-page-id="aa0004" onSubmit={f.handleSubmit} noValidate>
          <ul>
            <li className="field name-gender">
              <div className="name">
                <label className="label" htmlFor={id('name')}>
                  이름
                </label>
                <input
                  className="input"
                  id={id('name')}
                  name="name"
                  placeholder="예) 홍길동"
                  autoComplete="name"
                  required
                  value={f.name}
                  onCompositionStart={() => {
                    f.composingName.current = true;
                  }}
                  onCompositionEnd={(e) => {
                    f.composingName.current = false;
                    f.setName(cleanName(e.currentTarget.value));
                  }}
                  onChange={(e) => {
                    e.target.setCustomValidity('');
                    f.setName(f.composingName.current ? e.target.value : cleanName(e.target.value));
                  }}
                />
              </div>
              <div className="gender">
                {['남자', '여자'].map((g, i) => (
                  <div className="sex_box" key={g}>
                    <input
                      type="radio"
                      id={id(g)}
                      name="gender"
                      value={g}
                      checked={(f.gender || '남자') === g}
                      onChange={() => f.setGender(g)}
                    />
                    <label htmlFor={id(g)}>{i === 0 ? '남' : '여'}</label>
                  </div>
                ))}
              </div>
            </li>
            <li className="field">
              <label className="label" htmlFor={id('birth')}>
                생년월일
              </label>
              <input
                className="input"
                id={id('birth')}
                name="birth"
                type="tel"
                placeholder="예) 880818"
                maxLength={8}
                required
                value={f.birth}
                onChange={(e) => {
                  e.target.setCustomValidity('');
                  f.setBirth(digitsOnly(e.target.value, 8));
                }}
                onBlur={(e) => f.completeBirth(e.currentTarget)}
              />
            </li>
            <li className="field phone-mb">
              <label className="label" htmlFor={id('phone')}>
                전화번호
              </label>
              <div className="phone">
                <select
                  className="select"
                  aria-label="전화번호 앞자리"
                  value={prefix}
                  onChange={(e) => {
                    setPrefix(e.target.value);
                    f.setPhone(e.target.value + number);
                  }}
                >
                  {['010', '011', '016', '017', '018', '019'].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
                <input
                  className="input"
                  id={id('phone')}
                  type="tel"
                  placeholder="'-'를 제외해주세요"
                  maxLength={11}
                  value={number}
                  onChange={(e) => {
                    const n = digitsOnly(e.target.value, 11);
                    setNumber(n);
                    f.setPhone(n.startsWith('01') ? n : prefix + n);
                    const phone = e.currentTarget.form?.elements.namedItem(
                      'phone',
                    ) as HTMLInputElement;
                    phone?.setCustomValidity('');
                  }}
                />
              </div>
              <input
                className="cancer-validation-phone"
                name="phone"
                aria-label="전체 전화번호"
                tabIndex={-1}
                value={f.phone}
                onChange={() => {}}
                required
              />
            </li>
          </ul>
          <div className="confirm_wrap">
            <div className="privacy_wrap agree">
              <input type="checkbox" name="agree" id={id('agree')} required />
              <i className="agree-icon" />
              <label htmlFor={id('agree')}>개인정보 수집 · 이용 · 제3자 제공 동의</label>
              <button type="button" className="show_btn_db" onClick={() => setPrivacy(true)}>
                보기
              </button>
            </div>
          </div>
          <input type="hidden" name="interest" value="암보험" />
          <input
            className="form-trap"
            name="website_alt"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            readOnly
          />
          {f.formError && (
            <p className="cancer-error" role="alert">
              {f.formError}
            </p>
          )}
          <div className="form_btn_wrap">
            <button
              className="btn_submit submit btn1"
              disabled={f.status === 'submitting' || f.remaining > 0}
            >
              <img src={asset('Img/form_icon1.png')} alt="" />
              {f.status === 'submitting'
                ? '신청 중…'
                : f.remaining > 0
                  ? `${f.remaining}초 후 다시 신청`
                  : '간편 확인하기'}
            </button>
          </div>
        </form>
      )}
      {privacy && (
        <div className="cancer-modal-backdrop" onClick={() => setPrivacy(false)}>
          <section
            className="cancer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={id('privacy')}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id={id('privacy')}>개인정보 수집·이용 동의</h2>
            <p>
              수집 항목: 이름, 전화번호, 생년월일, 성별
              <br />
              이용 목적: 보험 비교 및 상담 안내
              <br />
              보유 기간: 접수일로부터 90일
              <br />
              동의를 거부할 수 있으나 상담 신청이 제한됩니다.
            </p>
            <button type="button" autoFocus onClick={() => setPrivacy(false)}>
              닫기
            </button>
          </section>
        </div>
      )}
    </>
  );
}
