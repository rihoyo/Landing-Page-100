import { landingRoutes } from './pages/registry';

// Load only this landing's code. The built HTML already contains its visible screen.
export async function loadApp() {
  const base = import.meta.env.BASE_URL;
  const pathname = location.pathname;
  const relative = base !== '/' && pathname.startsWith(base)
    ? '/' + pathname.slice(base.length)
    : pathname;
  const path = relative.replace(/\/+$/, '') || '/';
  const route = landingRoutes.find(route => route.paths.some(p => p === path));

  if (route?.id === 'aa0003') {
    const { default: Health } = await import('./pages/health/page');
    return <Health />;
  }
  if (route) {
    const { default: Home } = await import('./pages/home/page');
    return <Home pageId={route.id} />;
  }
  return <main style={{ padding: 60 }}><h1>페이지를 찾을 수 없습니다.</h1><a href={base}>홈으로 돌아가기</a></main>;
}
