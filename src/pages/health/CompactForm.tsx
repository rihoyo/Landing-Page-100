import { useConsultationForm } from '@/hooks/useConsultationForm';
import { cleanName, digitsOnly, formatPhone } from '@/lib/consultation';
export default function CompactForm() {
 const f = useConsultationForm();
 return <div className="health-form" id="consult"><p className="form-kicker">나의 월 보험료는 얼마일까?</p><h2>전문가 추천 상품, 월 보험료 실시간 간편확인!</h2>{f.status==='success'?<div className="form-success" role="status"><strong>상담 신청이 완료되었습니다.</strong><p>남겨주신 연락처로 담당 상담사가 연락드립니다.</p><button onClick={()=>f.setStatus('idle')}>추가로 신청하기</button></div>:<form data-page-id="aa0003" onSubmit={f.handleSubmit} noValidate>
 <div className="compact-fields"><input aria-label="이름" name="name" placeholder="이름" autoComplete="name" required value={f.name} onCompositionStart={()=>{f.composingName.current=true}} onCompositionEnd={e=>{f.composingName.current=false; f.setName(cleanName(e.currentTarget.value))}} onChange={e=>{e.target.setCustomValidity('');f.setName(f.composingName.current?e.target.value:cleanName(e.target.value))}}/>
 <fieldset className="gender"><legend className="sr-only">성별</legend>{['남자','여자'].map(g=><label key={g}><input type="radio" name="gender" value={g} checked={f.gender===g} onChange={()=>f.setGender(g)}/><span>{g==='남자'?'남성':'여성'}</span></label>)}</fieldset>
 <select name="region" aria-label="주거지역" defaultValue=""><option value="">주거지역</option>{['서울','경기','인천','부산','대구','광주','대전','울산','세종','강원','충북','충남','전북','전남','경북','경남','제주'].map(r=><option key={r}>{r}</option>)}</select>
 <input name="birth" aria-label="생년월일" placeholder="생년월일 (예: 900101)" inputMode="numeric" value={f.birth} onChange={e=>{e.target.setCustomValidity('');f.setBirth(digitsOnly(e.target.value,8))}} onBlur={e=>f.completeBirth(e.currentTarget)}/>
 <select name="consult_time" aria-label="상담 가능 시간" defaultValue=""><option value="">상담 가능 시간</option>{['오전 (09:00~12:00)','오후 (12:00~18:00)','저녁 (18:00 이후)','상관없음'].map(t=><option key={t}>{t}</option>)}</select>
 <input name="phone" type="tel" aria-label="휴대폰 번호" placeholder="휴대폰 번호 (- 없이)" autoComplete="tel" required value={f.phone} onChange={e=>{e.target.setCustomValidity('');f.setPhone(formatPhone(e.target.value))}}/>
 </div><input type="hidden" name="interest" value="건강보험"/><input type="hidden" name="age" value={f.age??''}/><input className="form-trap" name="website_alt" tabIndex={-1} aria-hidden="true" autoComplete="off" readOnly/>
 <details className="consent-details"><summary><label><input type="checkbox" name="agree" required/> 개인정보 수집·이용 동의 <span>(필수)</span></label><span>내용 보기</span></summary><p>수집 항목: 이름·연락처 및 선택 입력 정보 / 목적: 보험 비교 상담 / 보유 기간: 접수일로부터 90일. 동의를 거부할 수 있으나 상담 신청이 제한됩니다.</p></details>
 {f.formError&&<p role="alert" className="form-error">{f.formError}</p>}{f.remaining>0&&<p role="status">{f.remaining}초 후 다시 신청할 수 있습니다.</p>}
 <button className="health-submit" disabled={f.status==='submitting'||f.remaining>0}>{f.status==='submitting'?'신청 중…':f.remaining>0?`${f.remaining}초 후 다시 신청 가능`:'전문가 1:1 맞춤상담 신청'} <span aria-hidden="true">›</span></button>
 </form>}</div>
}
