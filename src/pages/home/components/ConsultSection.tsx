import { useEffect, useRef, useState, type FormEvent } from "react";

import { digitsOnly, formatPhone, normalizeBirth, calculateAge, buildConsultationPayload, validPhone, cleanName, validName, readSubmissionLimit, registerSubmission, SUBMISSION_SESSION_KEY } from "@/lib/consultation";

const FORM_ID = "consult-form";

const interestOptions = [
  "일반암 진단비",
  "유사암 진단비",
  "항암치료비",
  "암 수술비",
  "재진단암",
  "간병비",
];

export default function ConsultSection({pageId}: {pageId: string}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [name, setName] = useState("");
  const composingName = useRef(false);
  const limit = useRef(readSubmissionLimit());
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((limit.current.blockedUntil - Date.now()) / 1000)));
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, Math.ceil((limit.current.blockedUntil - Date.now()) / 1000))), 250);
    return () => window.clearInterval(timer);
  }, []);
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const completeBirth = (input: HTMLInputElement) => {
    const normalized = normalizeBirth(input.value);
    input.value = normalized;
    setBirth(normalized);
    setAge(null);
    input.setCustomValidity(normalized && calculateAge(normalized) === null ? "올바른 생년월일을 6자리 또는 8자리 숫자로 입력해주세요." : "");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (limit.current.blockedUntil > Date.now()) return;
    const form = event.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    nameInput.setCustomValidity(validName(nameInput.value) ? "" : "이름은 완성된 한글 또는 영문 2~40자로 입력해주세요. 비속어는 사용할 수 없습니다.");
    const phoneInput = form.elements.namedItem("phone") as HTMLInputElement;
    phoneInput.setCustomValidity(validPhone(phoneInput.value) ? "" : "지역번호를 포함한 올바른 전화번호를 입력해주세요.");
    completeBirth(form.elements.namedItem("birth") as HTMLInputElement);
    if (!form.reportValidity()) return;
    limit.current = registerSubmission(limit.current);
    try { sessionStorage.setItem(SUBMISSION_SESSION_KEY, JSON.stringify(limit.current)); } catch { /* Keep the in-memory limit if storage is unavailable. */ }
    setRemaining(Math.max(0, Math.ceil((limit.current.blockedUntil - Date.now()) / 1000)));
    const payload = buildConsultationPayload(form);
    setAge(payload.age);
    setStatus("error");
    setFormError("현재 상담 신청 준비 중입니다. 입력하신 정보는 전송되거나 저장되지 않았습니다.");
  };

  return (
    <section id="consult" className="w-full bg-background-100 py-16 md:py-24">
      <div className="w-full px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
            <div className="animate-float-up">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                <i className="ri-flashlight-line"></i> 1분이면 신청 완료
              </span>
              <h2 className="mt-5 font-heading text-2xl md:text-4xl font-bold text-foreground-950 leading-snug">
                지금 무료 상담 신청 한 번으로
                <br />
                나에게 맞는 암보험을 찾아보세요
              </h2>
              <p className="mt-5 text-sm md:text-base text-foreground-600 leading-relaxed">
                이름과 연락처만 남겨주시면 보험 전문 상담사가 연락드려
                <br className="hidden sm:block" />
                현재 보장과 원하시는 조건을 함께 정리해 드립니다.
                <br />
                비교와 상담은 전 과정 무료이며, 가입을 강요하지 않습니다.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  { icon: "ri-shield-check-line", text: "여러 보험사 암보험 한 번에 비교" },
                  { icon: "ri-lock-2-line", text: "개인정보는 상담 목적으로만 안전하게 사용" },
                  { icon: "ri-time-line", text: "영업일 1일 이내 빠른 연락" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-accent-100 text-accent-700 flex items-center justify-center shrink-0">
                      <i className={`${item.icon} text-lg`}></i>
                    </span>
                    <span className="text-sm md:text-[15px] text-foreground-800">{item.text}</span>
                  </li>
                ))}
              </ul>

            </div>

            <div className="bg-background-50 rounded-lg border border-background-200 p-5 md:p-8 animate-float-up">
              {status === "success" ? (
                <div className="text-center py-12">
                  <span className="mx-auto w-16 h-16 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center">
                    <i className="ri-check-line text-3xl"></i>
                  </span>
                  <h3 className="mt-6 font-heading text-xl md:text-2xl font-bold text-foreground-950">
                    상담 신청이 완료되었습니다
                  </h3>
                  <p className="mt-3 text-sm text-foreground-600 leading-relaxed">
                    남겨주신 연락처로 영업일 1일 이내에 담당 상담사가 연락드립니다.
                    조금만 기다려 주세요.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-md bg-secondary-100 text-secondary-900 text-sm font-semibold hover:bg-secondary-200 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-add-line"></i> 추가로 신청하기
                  </button>
                </div>
              ) : (
                <form
                  id={FORM_ID}
                  data-page-id={pageId}
                  data-readdy-form
                  className="consult-form"
                  onSubmit={handleSubmit}
                  noValidate
                  
                >
                  <h3 className="font-heading text-lg md:text-xl font-bold text-foreground-950">
                    무료 상담 신청서
                  </h3>
                  <p className="mt-1.5 text-xs md:text-sm text-foreground-500">
                    <span className="text-primary-600">*</span> 표시는 필수 입력 항목입니다.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-1">
                      <label htmlFor="c-name" className="block text-sm font-medium text-foreground-800 mb-1.5">
                        이름 <span className="text-primary-600">*</span>
                      </label>
                      <input
                        id="c-name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        autoComplete="name"
                        onCompositionStart={() => { composingName.current = true; }}
                        onCompositionEnd={event => {
                          composingName.current = false;
                          const cleaned = cleanName(event.currentTarget.value);
                          setName(cleaned);
                          event.currentTarget.setCustomValidity(validName(cleaned) ? "" : "이름을 확인해주세요. 비속어는 사용할 수 없습니다.");
                        }}
                        onChange={event => {
                          const value = composingName.current ? event.target.value : cleanName(event.target.value);
                          setName(value);
                          event.target.setCustomValidity("");
                        }}
                        onBlur={event => event.currentTarget.setCustomValidity(validName(event.currentTarget.value) ? "" : "이름은 완성된 한글 또는 영문 2~40자로 입력해주세요. 비속어는 사용할 수 없습니다.")}
                        placeholder="홍길동"
                        className="w-full px-4 py-3 rounded-md border border-background-300 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="c-phone" className="block text-sm font-medium text-foreground-800 mb-1.5">
                        연락처 <span className="text-primary-600">*</span>
                      </label>
                      <input
                        id="c-phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={phone}
                        onChange={event => { event.target.setCustomValidity(""); setPhone(formatPhone(event.target.value)); }}
                        title="지역번호 또는 휴대폰 번호를 입력해주세요."
                        required
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-3 rounded-md border border-background-300 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="c-birth" className="block text-sm font-medium text-foreground-800 mb-1.5">
                        생년월일
                      </label>
                      <input
                        id="c-birth"
                        name="birth"
                        type="text"
                        inputMode="numeric"
                        autoComplete="bday"
                        value={birth}
                        onChange={event => {
                          event.target.setCustomValidity("");
                          setBirth(digitsOnly(event.target.value, 8));
                          setAge(null);
                        }}
                        onBlur={event => completeBirth(event.currentTarget)}
                        placeholder="예) 971210 또는 19971210"
                        className="w-full px-4 py-3 rounded-md border border-background-300 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <fieldset>
                        <legend className="block text-sm font-medium text-foreground-800 mb-1.5">성별</legend>
                        <div className="flex gap-4 py-3">
                          {["남자", "여자"].map(option => (
                            <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                              <input type="checkbox" name="gender" value={option}
                                checked={gender === option}
                                onChange={event => setGender(event.target.checked ? option : "")}
                                className="accent-primary-500 w-4 h-4 cursor-pointer" />
                              {option}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="c-time" className="block text-sm font-medium text-foreground-800 mb-1.5">
                        희망 상담 시간
                      </label>
                      <select
                        id="c-time"
                        name="consult_time"
                        defaultValue=""
                        className="w-full px-4 py-3 rounded-md border border-background-300 bg-background-50 text-sm text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400/60 cursor-pointer"
                      >
                        <option value="">선택해 주세요</option>
                        <option value="오전 (09:00~12:00)">오전 (09:00~12:00)</option>
                        <option value="오후 (12:00~18:00)">오후 (12:00~18:00)</option>
                        <option value="저녁 (18:00 이후)">저녁 (18:00 이후)</option>
                        <option value="상관없음">상관없음</option>
                      </select>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor="c-age" className="block text-sm font-medium text-foreground-800 mb-1.5">
                        관심 연령대
                      </label>
                      <select
                        id="c-age"
                        name="age_group"
                        defaultValue=""
                        className="w-full px-4 py-3 rounded-md border border-background-300 bg-background-50 text-sm text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400/60 cursor-pointer"
                      >
                        <option value="">선택해 주세요</option>
                        <option value="20대">20대</option>
                        <option value="30대">30대</option>
                        <option value="40대">40대</option>
                        <option value="50대">50대</option>
                        <option value="60대 이상">60대 이상</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="block text-sm font-medium text-foreground-800 mb-2">
                        관심 보장 (복수 선택 가능)
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {interestOptions.map((option, idx) => (
                          <label
                            key={option}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-background-300 bg-background-50 text-xs md:text-[13px] text-foreground-700 cursor-pointer hover:border-primary-300 transition-colors"
                          >
                            <input
                              type="checkbox"
                              name="interest"
                              value={option}
                              defaultChecked={idx === 0}
                              className="accent-primary-500 w-4 h-4 cursor-pointer"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="c-message" className="block text-sm font-medium text-foreground-800 mb-1.5">
                        문의 내용 (선택)
                      </label>
                      <textarea
                        id="c-message"
                        name="message"
                        rows={3}
                        maxLength={500}
                        placeholder="현재 보험 상황이나 궁금한 점을 적어주시면 더 정확한 상담이 가능합니다. (최대 500자)"
                        className="w-full px-4 py-3 rounded-md border border-background-300 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/60 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <input type="hidden" name="age" value={age ?? ""} />

                  <div className="field-extra-note" aria-hidden="true">
                    <label htmlFor="c-website-alt">Website</label>
                    <input
                      id="c-website-alt"
                      name="website_alt"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      readOnly
                    />
                  </div>

                  <label className="mt-5 flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agree"
                      required
                      defaultChecked={false}
                      className="mt-0.5 accent-primary-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs md:text-[13px] text-foreground-600 leading-relaxed">
                      개인정보 수집·이용에 동의합니다. (필수) 수집 항목: 이름·연락처 및 선택 입력 정보 / 목적: 보험 비교 상담 / 보유 기간: 접수일로부터 90일. 동의를 거부할 수 있으나 상담 신청이 제한됩니다.
                    </span>
                  </label>

                  {remaining > 0 && <p role="status" aria-live="polite" className="mt-4 text-sm text-primary-700">1분 이내 5회 신청하여 잠시 대기합니다. {remaining}초 후 다시 신청할 수 있습니다.</p>}
                  {status === "error" && formError && (
                    <p className="mt-4 flex items-start gap-2 text-sm text-primary-700 bg-primary-50 border border-primary-200 rounded-md px-4 py-3">
                      <i className="ri-error-warning-line mt-0.5"></i>
                      <span>{formError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || remaining > 0}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md bg-primary-500 text-background-50 text-base font-bold hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {remaining > 0 ? `${remaining}초 후 다시 신청 가능` : status === "submitting" ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i> 신청 중...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-fill"></i> 무료 상담 신청하기
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-[11px] text-foreground-400">
                    상담 신청만으로는 보험료가 청구되지 않습니다.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}