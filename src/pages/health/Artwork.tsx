const asset = (name: string) => `${import.meta.env.BASE_URL}assets/health/${name}`;

export function InsuranceArt({warm = false}: {warm?: boolean}) {
  return <img className={`insurance-art${warm ? ' insurance-art-warm' : ''}`}
    src={asset('insurance-960.webp')}
    srcSet={`${asset('insurance-480.webp')} 480w, ${asset('insurance-960.webp')} 960w`}
    sizes="(max-width: 600px) 240px, 420px"
    width={960} height={720}
    alt="우산으로 보호받는 건강보험 보장 내역과 의료 용품"
    loading={warm ? 'lazy' : 'eager'} fetchPriority={warm ? 'auto' : 'high'} decoding="async" />;
}

export function AdviserArt() {
  return <img className="adviser-art"
    src={asset('adviser-640.webp')}
    srcSet={`${asset('adviser-320.webp')} 320w, ${asset('adviser-640.webp')} 640w`}
    sizes="(max-width: 600px) 110px, 180px"
    width={640} height={960}
    alt="보험 보장 내용을 안내하는 전문 상담사 일러스트"
    loading="lazy" decoding="async" />;
}
