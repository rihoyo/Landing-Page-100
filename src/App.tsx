import Home from "./pages/home/page";
export default function App(){
  const path = location.pathname.replace(import.meta.env.BASE_URL, '/').replace(/\/+$/, '') || '/';
  if(path === '/' || path === '/aa0001') return <Home pageId="aa0001"/>;
  if(path === '/aa0002') return <Home pageId="aa0002"/>;
  return <main style={{padding:60}}><h1>페이지를 찾을 수 없습니다.</h1><a href={import.meta.env.BASE_URL}>홈으로 돌아가기</a></main>;
}
