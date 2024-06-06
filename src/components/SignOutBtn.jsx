import { supabase } from '../supabaseClient';

function SignOutBtn() {
  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // 로그아웃 후 페이지 새로고침
  };

  return <button onClick={signOut} className="py-1 px-2 rounded text-sm font-bold">로그아웃</button>;
}

export default SignOutBtn;
