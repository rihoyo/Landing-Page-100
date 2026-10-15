import CancerForm from './Form';
import { asset } from './assets';
// 원본 디자인의 영역과 이미지 배치를 유지합니다.
export default function Content() {
  const today = new Date()
    .toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' })
    .split('-')
    .map(Number);
  const todayLabel = today[0] + '년 ' + today[1] + '월 ' + today[2] + '일';
  const nextYearLabel =
    today[0] +
    1 +
    '년 ' +
    String(today[1]).padStart(2, '0') +
    '월 ' +
    String(today[2]).padStart(2, '0') +
    '일';
  return (
    <div id="wrap">
      <header>
        <div className="hd-wrap">
          <h1>
            <a href="#">
              <img src={asset('Img/logo_PC.png')} alt="보험사이트" />
            </a>
          </h1>
          <div className="counseling">
            <div className="top-day">
              <span>{'보험료 갱신 업데이트'}</span>
              <span className="line"></span>
              <span className="color" id="today-date">
                {todayLabel}
              </span>
            </div>
            <div className="message">
              <div className="message-icon">
                <img src={asset('Img/message.png')} alt="" />
                {'\n\t\t\t\t\t\t상담신청\n\t\t\t\t\t'}
              </div>
              <span>{'24시간 가능'}</span>
            </div>
          </div>
        </div>
      </header>
      <div className="content-wrap">
        <div className="section1">
          <div className="section-box">
            <div className="title">
              <div className="txt">
                <p className="color">{'보험 종류가 너무 많아 고민된다면?'}</p>
                <h2>
                  {'주요 보험사들을 한 곳에 모아 '}
                  <br />
                  <span className="color">{'암보험 비교'}</span>
                  {'해 보세요!'}
                </h2>
              </div>
              <img src={asset('Img/main-img01.png')} alt="" />
            </div>
            <div className="container">
              <div className="left-box">
                <h5>{'암 보험료 확인하기'}</h5>
                <div className="form_wrap">
                  <CancerForm suffix="0" />
                </div>
              </div>
              <img src={asset('Img/arrow2.png')} alt="" />
              <div className="right-box">
                <h2 className="insure-title">{'보험료 확인'}</h2>
                <div className="insure-banner">
                  <p className="bold">
                    <span className="color user_name">{'홍길동'}</span>
                    {' 고객님의 보험나이는 '}
                    <span className="color user_age">{'○○세'}</span>
                    {'\n\t\t\t\t\t\t\t\t입니다.'}
                  </p>
                  <p>
                    {'고객님의 보험료 인상 예정일은 '}
                    <span className="color increase-date">{nextYearLabel}</span>
                    {' 입니다.'}
                  </p>
                </div>
                <ul className="insurer-list">
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_hd.svg')} alt="현대해상 로고" />
                  </li>
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_hw.svg')} alt="한화손해보험 로고" />
                  </li>
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_me.svg')} alt="메리츠화재 로고" />
                  </li>
                  <li className="insurer-item db-logo">
                    <img src={asset('common/bohum_list/logo_db.svg')} alt="DB손해보험 로고" />
                  </li>
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_kb.svg')} alt="KB손해보험 로고" />
                  </li>
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_hk.svg')} alt="흥국보험 로고" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="section-box section-box2">
            <div className="txt">
              <h5>{'신청자 현황'}</h5>
            </div>
            <div className="slide-now">
              <div className="swiper mySwiper customer_swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img src={asset('Img/slide-list01.png')} alt="신청자이미지" />
                    <p>{'이**'}</p>
                    <span className="phone">{'010-****-3505'}</span>
                  </div>
                  <div className="swiper-slide">
                    <img src={asset('Img/slide-list02.png')} alt="신청자이미지" />
                    <p>{'김**'}</p>
                    <span className="phone">{'010-****-2400'}</span>
                  </div>
                  <div className="swiper-slide">
                    <img src={asset('Img/slide-list03.png')} alt="신청자이미지" />
                    <p>{'소**'}</p>
                    <span className="phone">{'010-****-8239'}</span>
                  </div>
                  <div className="swiper-slide">
                    <img src={asset('Img/slide-list04.png')} alt="신청자이미지" />
                    <p>{'김**'}</p>
                    <span className="phone">{'010-****-0416'}</span>
                  </div>
                  <div className="swiper-slide">
                    <img src={asset('Img/slide-list01.png')} alt="신청자이미지" />
                    <p>{'윤**'}</p>
                    <span className="phone">{'010-****-3829'}</span>
                  </div>
                  <div className="swiper-slide">
                    <img src={asset('Img/slide-list02.png')} alt="신청자이미지" />
                    <p>{'홍**'}</p>
                    <span className="phone">{'010-****-3757'}</span>
                  </div>
                  <div className="swiper-slide">
                    <img src={asset('Img/slide-list03.png')} alt="신청자이미지" />
                    <p>{'김**'}</p>
                    <span className="phone">{'010-****-0542'}</span>
                  </div>
                  <div className="swiper-slide">
                    <img src={asset('Img/slide-list04.png')} alt="신청자이미지" />
                    <p>{'박**'}</p>
                    <span className="phone">{'010-****-1505'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section2">
        <h3>
          <span className="quote quote_left"></span>
          {'국내 주요 보험사 상품을 실시간으로 비교해,'}
          <br />
          <span className="color">{'상품별 맞춤 보장분석'}</span>
          {'으로 당신의 보험을 바로 잡아드립니다.'}
          <span className="quote quote_right"></span>
        </h3>
        <div className="slide-now content-wrap">
          <div className="swiper logoSide">
            <div className="swiper-wrapper">
              <div className="swiper-slide sam-logo">
                <img src={asset('common/bohum_list/logo_sam.svg')} alt="" />
              </div>
              <div className="swiper-slide">
                <img src={asset('common/bohum_list/logo_kb.svg')} alt="" />
              </div>
              <div className="swiper-slide">
                <img src={asset('common/bohum_list/logo_hd.svg')} alt="" />
              </div>
              <div className="swiper-slide db-logo">
                <img src={asset('common/bohum_list/logo_db.svg')} alt="" />
              </div>
              <div className="swiper-slide">
                <img src={asset('common/bohum_list/logo_hk.svg')} alt="" />
              </div>
              <div className="swiper-slide">
                <img src={asset('common/bohum_list/logo_me.svg')} alt="" />
              </div>
              <div className="swiper-slide">
                <img src={asset('common/bohum_list/logo_hw.svg')} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content_wrap">
        <div className="section3">
          <div className="container">
            <h3>
              {'지금 고객님께 '}
              <span className="color">{'꼭! 필요한 보험상품'}</span>
            </h3>
            <div id="bohumList">
              <div className="subpage-tab-content list1 acc">
                <ul>
                  <li>
                    <div className="list-logo">
                      <div className="img">
                        <img src={asset('common/bohum_list/logo_hk.svg')} alt="" />
                      </div>
                      <div className="txt">
                        <p>{'흥국화재보험'}</p>
                      </div>
                    </div>
                    <div className="right_wrap">
                      <div className="hide_price">
                        <span>{'**,***'}</span>
                        {'원\n\t\t\t\t\t\t\t\t\t'}
                      </div>
                      <button type="button" className="check_btn">
                        {'\n\t\t\t\t\t\t\t\t\t\t보험료 확인하기 '}
                        <span className="click-color">{'Click'}</span>
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="list-logo">
                      <div className="img">
                        <img src={asset('common/bohum_list/logo_kb.svg')} alt="" />
                      </div>
                      <div className="txt">
                        <p>{'KB손해보험'}</p>
                      </div>
                    </div>
                    <div className="right_wrap">
                      <div className="hide_price">
                        <span>{'**,***'}</span>
                        {'원\n\t\t\t\t\t\t\t\t\t'}
                      </div>
                      <button type="button" className="check_btn">
                        {'\n\t\t\t\t\t\t\t\t\t\t보험료 확인하기 '}
                        <span className="click-color">{'Click'}</span>
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="list-logo">
                      <div className="img">
                        <img src={asset('common/bohum_list/logo_me.svg')} alt="" />
                      </div>
                      <div className="txt">
                        <p>{'메리츠화재보험'}</p>
                      </div>
                    </div>
                    <div className="right_wrap">
                      <div className="hide_price">
                        <span>{'**,***'}</span>
                        {'원\n\t\t\t\t\t\t\t\t\t'}
                      </div>
                      <button type="button" className="check_btn">
                        {'\n\t\t\t\t\t\t\t\t\t\t보험료 확인하기 '}
                        <span className="click-color">{'Click'}</span>
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="list-logo">
                      <div className="img">
                        <img src={asset('common/bohum_list/logo_db.svg')} alt="" />
                      </div>
                      <div className="txt">
                        <p>{'DB손해보험'}</p>
                      </div>
                    </div>
                    <div className="right_wrap">
                      <div className="hide_price">
                        <span>{'**,***'}</span>
                        {'원\n\t\t\t\t\t\t\t\t\t'}
                      </div>
                      <button type="button" className="check_btn">
                        {'\n\t\t\t\t\t\t\t\t\t\t보험료 확인하기 '}
                        <span className="click-color">{'Click'}</span>
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="list-logo">
                      <div className="img sam-logo">
                        <img src={asset('common/bohum_list/logo_sam.svg')} alt="" />
                      </div>
                      <div className="txt">
                        <p>{'삼성화재'}</p>
                      </div>
                    </div>
                    <div className="right_wrap">
                      <div className="hide_price">
                        <span>{'**,***'}</span>
                        {'원\n\t\t\t\t\t\t\t\t\t'}
                      </div>
                      <button type="button" className="check_btn">
                        {'\n\t\t\t\t\t\t\t\t\t\t보험료 확인하기 '}
                        <span className="click-color">{'Click'}</span>
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="list-logo">
                      <div className="img hd-logo">
                        <img src={asset('common/bohum_list/logo_hd.svg')} alt="" />
                      </div>
                      <div className="txt">
                        <p>{'현대해상'}</p>
                      </div>
                    </div>
                    <div className="right_wrap">
                      <div className="hide_price">
                        <span>{'**,***'}</span>
                        {'원\n\t\t\t\t\t\t\t\t\t'}
                      </div>
                      <button type="button" className="check_btn">
                        {'\n\t\t\t\t\t\t\t\t\t\t보험료 확인하기 '}
                        <span className="click-color">{'Click'}</span>
                      </button>
                    </div>
                  </li>
                  <li>
                    <div className="list-logo">
                      <div className="img">
                        <img src={asset('common/bohum_list/logo_hw.svg')} alt="" />
                      </div>
                      <div className="txt">
                        <p>{'한화손해보험'}</p>
                      </div>
                    </div>
                    <div className="right_wrap">
                      <div className="hide_price">
                        <span>{'**,***'}</span>
                        {'원\n\t\t\t\t\t\t\t\t\t'}
                      </div>
                      <button type="button" className="check_btn">
                        {'\n\t\t\t\t\t\t\t\t\t\t보험료 확인하기 '}
                        <span className="click-color">{'Click'}</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <table id="sampleTable">
              <thead></thead>
              <tbody id="sampleTbody"></tbody>
            </table>
          </div>
        </div>
        <div className="section4">
          <div className="container">
            <div className="sub-title">
              <span className="color bg">{'NEW 암보험 비교'}</span>
            </div>
            <h3>{'암보험 완벽하게 대비하기!'}</h3>
            <ul>
              <li>
                <p className="title">
                  {'암보험 알뜰가입 '}
                  <span className="color">{'TIP'}</span>
                </p>
                <p>
                  {'비갱신형+순수보장형+무해지 '}
                  <br />
                  {'환급형으로 보험료 체크'}
                </p>
                <div className="img-right">
                  <img src={asset('Img/img-right01.png')} alt="" />
                </div>
              </li>
              <li>
                <p className="title">
                  {'진단을 통한 '}
                  <span className="color">{'맞춤보장'}</span>
                </p>
                <p>
                  {'나에게 맞는 보장과 보험료로 '}
                  <br />
                  {'스마트하게!'}
                </p>
                <div className="img-right">
                  <img src={asset('Img/img-right02.png')} alt="" />
                </div>
              </li>
              <li>
                <p className="title">
                  {'믿을 수 있는 국내 '}
                  <span className="color">{'전문가'}</span>
                </p>
                <p>
                  {'나한테 가장 잘맞는 보험상품을 '}
                  <br />
                  {'한 번에 비교, 내게 맞춘 보장분석!'}
                </p>
                <div className="img-right">
                  <img src={asset('Img/img-right03.png')} alt="" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="section5">
          <div className="container">
            <div className="left">
              <h3>
                {'암보험 가입 시 보장 '}
                <br />
                <span className="color">{'중요'}</span>
                {' 체크 리스트'}
              </h3>
            </div>
            <div className="right">
              <div className="right-list">
                <dl>
                  <dt>{'암 진단비 특약'}</dt>
                  <dd>
                    {'보험 기간 중 암으로 확정 진단을 받았을때 '}
                    <br />
                    {'보장을 받을 수 있는 담보'}
                  </dd>
                </dl>
                <dl>
                  <dt>{'암 수술비 특약'}</dt>
                  <dd>
                    {'암진단 확정 후 직접적인 치료를 위하여 '}
                    <br />
                    {'수술을 받는 경우에 보장을 받을 수 있는 담보'}
                  </dd>
                </dl>
                <dl>
                  <dt>{'표적항암약물 허가치료 특약'}</dt>
                  <dd>
                    {'치료의 목적으로 표적항암약물 사용을 '}
                    <br />
                    {'허가 받은 경우 보장을 받을 수 있는 담보'}
                  </dd>
                </dl>
              </div>
              <p>{'*해당 특약 가입 시 보장 가능'}</p>
            </div>
          </div>
        </div>
        <div className="section5 section6">
          <div className="container">
            <div className="left">
              <h3>
                {'암보험 가입 시 보장 '}
                <br />
                <span className="color">{'서브'}</span>
                {' 체크 리스트'}
              </h3>
            </div>
            <div className="right">
              <div className="right-list">
                <dl>
                  <dt>{'입원 & 통원 특약'}</dt>
                  <dd>
                    {'암으로 입원 · 통원하는 경우 보장하는 담보 '}
                    <br />
                    {'(일반병원 및 상급종합병원도 보장)'}
                  </dd>
                </dl>
                <dl>
                  <dt>{'사망보험금 특약'}</dt>
                  <dd>
                    {'암으로 인해 사망한 경우 사망보험금을 '}
                    <br />
                    {'받을 수 있는 담보'}
                  </dd>
                </dl>
              </div>
              <p>{'*해당 특약 가입 시 보장 가능'}</p>
            </div>
          </div>
        </div>
        <div className="section5 section7">
          <div className="container">
            <div className="left">
              <h3>
                <span className="color">{'갱신형, 비갱신형'}</span>
                <br />
                {'비교해 보세요!'}
              </h3>
            </div>
            <div className="right">
              <dl>
                <dt>{'갱신형'}</dt>
                <dd>{'가입 시 초기 보험료 부담이 적다'}</dd>
                <dd>{'보험 만기까지 보험료를 납입'}</dd>
                <dd>
                  {'갱신시기마다 보험료 변동 '}
                  <br />
                  {'(인상 또는 인하)'}
                </dd>
                <dd className="bottom-check">
                  {'갱신 기간을 활용, 변동성이'}
                  <br />
                  {'큰 보장에 대한 대비'}
                </dd>
              </dl>
              <dl>
                <dt>{'비갱신형'}</dt>
                <dd>{'납부 기간동안 동일한 보험료'}</dd>
                <dd>{'보험료 변동이 없고 납입 기간이 끝난 후 추가 납입도 없다'}</dd>
                <dd className="bottom-check bottom-check2">
                  {'일정한 보험료, 납입 기간이 '}
                  <br />
                  {'정해져 있어, 재테크에 용이'}
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="section5 section8">
          <div className="container">
            <div className="left">
              <h3>
                {'보장 가능한 '}
                <br />
                <span className="color">{'암의 종류'}</span>
              </h3>
            </div>
            <div className="right">
              <div className="right-list">
                <dl>
                  <dt>
                    <span className="color">{'유사암'}</span>
                  </dt>
                  <dd>
                    {'갑상선암, 경계성종양 '}
                    <br />
                    {'기타피부암, 제자리암'}
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <span className="color">{'소액암'}</span>
                  </dt>
                  <dd>
                    {'유방암, 자궁암, 전립선암 '}
                    <br />
                    {'방광암, 대장점막내암 등'}
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <span className="color">{'일반암'}</span>
                  </dt>
                  <dd>{'유사암을 제외한 암'}</dd>
                </dl>
                <dl>
                  <dt>
                    <span className="color">{'고액암'}</span>
                  </dt>
                  <dd>
                    {'백혈병, 뇌암, 골수암 '}
                    <br />
                    {'식도암, 췌장암'}
                  </dd>
                </dl>
              </div>
              <p>{'*보험사별, 상품별 분류 기준이 상이할 수 있습니다.'}</p>
              <p>{'*해당 특약 가입 시 보장 가능'}</p>
            </div>
          </div>
        </div>
        <div className="benner">
          <h3>{'내 보험료는 얼마일까?'}</h3>
          <p>
            <span className="color">{'한 번에 비교'}</span>
            {'하고, 상세 플랜은 '}
            <br />
            {'보험전문가 상담도 받아보세요!'}
          </p>
          <img src={asset('Img/banner-img.png')} alt="" />
        </div>
      </div>
      <div className="bottom_form_wrap section1 section9">
        <div className="content-wrap">
          <div className="section-box">
            <h3>
              {'주요 보험사들 '}
              <span className="color">{'한 번에 확인'}</span>
              {'하기'}
            </h3>
            <div className="container">
              <div className="left-box">
                <h5>{'암 보험료 확인하기'}</h5>
                <CancerForm suffix="1" />
              </div>
              <img src={asset('Img/arrow2.png')} alt="" />
              <div className="right-box">
                <h2 className="insure-title">{'보험료 확인'}</h2>
                <div className="insure-banner">
                  <p className="bold">
                    <span className="color user_name">{'홍길동'}</span>
                    {' 고객님의 보험나이는 '}
                    <span className="color user_age">{'○○세'}</span>
                    {'\n\t\t\t\t\t\t\t입니다.'}
                  </p>
                  <p>
                    {'고객님의 보험료 인상 예정일은 '}
                    <span className="color increase-date">{nextYearLabel}</span>
                    {' 입니다.'}
                  </p>
                </div>
                <ul className="insurer-list">
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_hd.svg')} alt="현대해상 로고" />
                  </li>
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_hw.svg')} alt="한화손해보험 로고" />
                  </li>
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_me.svg')} alt="메리츠화재 로고" />
                  </li>
                  <li className="insurer-item db-logo">
                    <img src={asset('common/bohum_list/logo_db.svg')} alt="DB손해보험 로고" />
                  </li>
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_kb.svg')} alt="KB손해보험 로고" />
                  </li>
                  <li className="insurer-item">
                    <img src={asset('common/bohum_list/logo_hk.svg')} alt="흥국보험 로고" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
