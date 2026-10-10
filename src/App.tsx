import { lazy, Suspense } from 'react';
import { landingRoutes } from './pages/registry';
const Home = lazy(() => import('./pages/home/page'));
const Health = lazy(() => import('./pages/health/page'));
export default function App(){
 const base = import.meta.env.BASE_URL;
 const pathname = location.pathname;
 const relative = base !== '/' && pathname.startsWith(base) ? '/' + pathname.slice(base.length) : pathname;
 const path = relative.replace(/\/+$/, '') || '/';
 const route = landingRoutes.find(route => route.paths.some(p => p === path));
 return <Suspense fallback={<p role="status" style={{padding:24}}>페이지를 불러오는 중입니다…</p>}>
 {route?.id === 'aa0003' ? <Health/> : route ? <Home pageId={route.id}/> : <main style={{padding:60}}><h1>페이지를 찾을 수 없습니다.</h1><a href={base}>홈으로 돌아가기</a></main>}
 </Suspense>;
}
