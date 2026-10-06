export type CoverageItem = {
  id: string;
  icon: string;
  title: string;
  amount: string;
  description: string;
};

export const coverageItems: CoverageItem[] = [
  {
    id: "cov-1",
    icon: "ri-heart-pulse-line",
    title: "일반암 진단비",
    amount: "최대 5,000만원",
    description: "위암·폐암·대장암 등 일반암 진단 시 한 번에 지급되는 핵심 보장입니다.",
  },
  {
    id: "cov-2",
    icon: "ri-shield-cross-line",
    title: "유사암 진단비",
    amount: "최대 1,000만원",
    description: "갑상선암·기타피부암 등 유사암에 대해 별도로 준비하는 보장입니다.",
  },
  {
    id: "cov-3",
    icon: "ri-medicine-bottle-line",
    title: "항암치료비",
    amount: "최대 5,000만원",
    description: "항암약물·방사선·항암방사선 치료 등 실제 치료 과정을 폭넓게 보장합니다.",
  },
  {
    id: "cov-4",
    icon: "ri-surgical-mask-line",
    title: "암 수술비",
    amount: "회당 최대 300만원",
    description: "암 진단 후 수술을 받을 때마다 반복 지급되어 반복 치료에 대비합니다.",
  },
  {
    id: "cov-5",
    icon: "ri-refresh-line",
    title: "재진단암 진단비",
    amount: "최대 2,000만원",
    description: "완치 후 재발·전이로 다시 진단받을 때도 추가로 보장받을 수 있습니다.",
  },
  {
    id: "cov-6",
    icon: "ri-community-line",
    title: "가족 돌봄 비용",
    amount: "최대 1,500만원",
    description: "입원·통원 간병 비용까지 준비해 실제 부담을 줄여주는 보장입니다.",
  },
];

export type AgePlan = {
  id: string;
  label: string;
  gender: string;
  premium: number;
  coverage: string;
  note: string;
};

export const agePlans: AgePlan[] = [
  {
    id: "age-20",
    label: "20대",
    gender: "남성",
    premium: 6900,
    coverage: "일반암 진단비 3,000만원 + 유사암 500만원",
    note: "젊을수록 보험료가 낮아 미리 준비하기 좋은 시기",
  },
  {
    id: "age-30",
    label: "30대",
    gender: "남성",
    premium: 9800,
    coverage: "일반암 진단비 3,000만원 + 항암치료비 2,000만원",
    note: "가족 구성과 함께 보장을 넓히기 좋은 시기",
  },
  {
    id: "age-40",
    label: "40대",
    gender: "남성",
    premium: 13900,
    coverage: "일반암 진단비 4,000만원 + 수술비 + 재진단암",
    note: "가장 많은 분들이 비교·상담을 신청하는 연령대",
  },
  {
    id: "age-50",
    label: "50대",
    gender: "남성",
    premium: 21200,
    coverage: "일반암 진단비 4,000만원 + 간병비 1,000만원",
    note: "기존 보험 대비 보험료 절감 효과가 큰 연령대",
  },
  {
    id: "age-60",
    label: "60대",
    gender: "남성",
    premium: 29800,
    coverage: "간편심사 일반암 진단비 3,000만원 + 수술비",
    note: "병력이 있어도 가입 가능한 간편심사 상품 비교",
  },
];