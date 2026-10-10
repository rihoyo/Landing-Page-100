const asset = (name: string) => `${import.meta.env.BASE_URL}assets/health/${name}`;
const illustrations = {
  hero: {widths: [560, 960], ratio: 4 / 3, sizes: '(max-width: 600px) 260px, 420px', alt: '우산과 건강보험 보장 내역, 의료 용품'},
  adviser: {widths: [208, 384], ratio: 2 / 3, sizes: '(max-width: 600px) 100px, 150px', alt: '보장 내용을 설명하는 건강보험 상담사'},
  parent: {widths: [120, 240], ratio: 3 / 4, sizes: '(max-width: 600px) 44px, 72px', alt: '손을 잡고 함께 걷는 엄마와 아이'},
  family: {widths: [360, 720], ratio: 4 / 3, sizes: '(max-width: 600px) 170px, 340px', alt: '병원 앞에 함께 서 있는 가족'},
  budget: {widths: [384, 720], ratio: 4 / 3, sizes: '(max-width: 600px) 190px, 350px', alt: '보험료 절약을 나타내는 동전과 계산기, 보험 보장 내역'},
} as const;

// One image renderer handles responsive sources and loading for all illustrations.
export function HealthArtwork({name, priority = false}: {name: keyof typeof illustrations; priority?: boolean}) {
  const illustration = illustrations[name];
  const width = illustration.widths[1];
  return <img className={`health-art health-art-${name}`}
    src={asset(`${name}-v3-${width}.webp`)}
    srcSet={illustration.widths.map(w => `${asset(`${name}-v3-${w}.webp`)} ${w}w`).join(', ')}
    sizes={illustration.sizes}
    width={width} height={Math.round(width / illustration.ratio)}
    alt={illustration.alt}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />;
}
