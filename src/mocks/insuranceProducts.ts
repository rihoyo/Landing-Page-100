export type InsuranceProduct = {
  id: string;
  name: string;
  monthlyPremium: number;
  mainBenefit: string;
  tags: string[];
  highlight: string;
  ageBasis: string;
  rating: number;
};

export const insuranceProducts: InsuranceProduct[] = [
  {
    id: "prod-1",
    name: "더든든 암보험 Plus",
    monthlyPremium: 12800,
    mainBenefit: "일반암 진단비 3,000만원",
    tags: ["3대질병", "비갱신형", "남녀공통"],
    highlight: "가장 많이 비교한 인기 상품",
    ageBasis: "40세 남성 기준",
    rating: 4.8,
  },
  {
    id: "prod-2",
    name: "건강지킴 암보험",
    monthlyPremium: 9400,
    mainBenefit: "유사암 진단비 1,000만원 포함",
    tags: ["유사암포함", "20년납", "가성비"],
    highlight: "보험료 부담 가장 낮은 구성",
    ageBasis: "40세 남성 기준",
    rating: 4.6,
  },
  {
    id: "prod-3",
    name: "간편심사 암보험",
    monthlyPremium: 18700,
    mainBenefit: "항암치료비 최대 5,000만원",
    tags: ["간편심사", "유병력자", "항암치료"],
    highlight: "가입 문턱 낮춘 간편심사형",
    ageBasis: "50세 남성 기준",
    rating: 4.7,
  },
  {
    id: "prod-4",
    name: "온가족 암보험",
    monthlyPremium: 15200,
    mainBenefit: "일반암 + 재진단암 동시 보장",
    tags: ["재진단암", "가족추천", "갱신형"],
    highlight: "재진단암까지 챙기는 구성",
    ageBasis: "40세 남성 기준",
    rating: 4.5,
  },
  {
    id: "prod-5",
    name: "여성케어 암보험",
    monthlyPremium: 11300,
    mainBenefit: "여성암 진단비 4,000만원",
    tags: ["여성전용", "여성암", "비갱신형"],
    highlight: "여성 관련 암 보장 강화",
    ageBasis: "35세 여성 기준",
    rating: 4.9,
  },
  {
    id: "prod-6",
    name: "시니어 암보험",
    monthlyPremium: 26500,
    mainBenefit: "고령자 전용 진단비 + 수술비",
    tags: ["고령자", "수술비", "간편가입"],
    highlight: "60대도 가입 가능한 전용 설계",
    ageBasis: "60세 남성 기준",
    rating: 4.4,
  },
];