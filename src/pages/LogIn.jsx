import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInBtn from '../components/SignInBtn';
import { supabase } from '../supabaseClient';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else {
      setError('');
      alert('로그인되었습니다.');
      setEmail('');
      setPassword('');
      navigate('/'); // 로그인 성공 시 홈페이지로 이동
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <main className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-white p-10 rounded shadow-md w-full max-w-md mt-4">
          <h1 className="text-5xl font-bold mb-6 text-center">L O G I N</h1>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-lg text-gray-700">이메일 :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                required
                className="w-full px-4 py-3 border rounded text-lg"
              />
            </div>
            <div>
              <label className="block text-lg text-gray-700">비밀번호 :</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                className="w-full px-4 py-3 border rounded text-lg"
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded text-lg hover:bg-blue-600">
              로그인
            </button>
          </form>
          <p className="mt-6 text-center text-lg">
            아직 회원이 아니라면?{' '}
            <Link to="/sign_up" className="text-blue-500 hover:underline">
              가입하러 가기
            </Link>
          </p>
          <div className="mt-6 flex justify-center w-full">
            <SignInBtn />
          </div>
          {error && <p className="mt-6 text-red-500 text-center text-lg">{error}</p>}
        </div>
      </main>
    </div>
  );
}

export default LogIn;
