export type ProcessStep = {
  id: string;
  step: string;
  icon: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    id: "step-1",
    step: "01",
    icon: "ri-edit-2-line",
    title: "무료 상담 신청",
    description: "이름과 연락처, 간단한 정보만 남겨주시면 신청이 완료됩니다. 1분이면 충분합니다.",
  },
  {
    id: "step-2",
    step: "02",
    icon: "ri-customer-service-2-line",
    title: "전문 상담사 배정",
    description: "보험 전문 상담사가 연락드려 현재 보장과 원하시는 조건을 함께 정리합니다.",
  },
  {
    id: "step-3",
    step: "03",
    icon: "ri-bar-chart-grouped-line",
    title: "맞춤 비교 분석",
    description: "여러 보험사의 암보험을 보장·보험료 기준으로 비교해 가장 유리한 선택지를 정리해 드립니다.",
  },
  {
    id: "step-4",
    step: "04",
    icon: "ri-hand-heart-line",
    title: "가입 및 사후 관리",
    description: "원하시는 상품으로 가입을 도와드리고, 이후 보장 점검과 유지 관리까지 함께합니다.",
  },
];