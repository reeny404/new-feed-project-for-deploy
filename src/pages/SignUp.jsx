// SignUp.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        setError('이미 등록된 이메일 주소입니다.');
      } else {
        setError('회원가입에 실패했습니다.');
      }
    } else {
      setError('');
      alert('회원가입이 완료되었습니다.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-md mt-8">
        <h1 className="text-5xl font-bold mb-6 text-center">S I G N U P</h1>
        <form onSubmit={handleSignUp} className="space-y-6">
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
          <div>
            <label className="block text-lg text-gray-700">비밀번호 재확인 :</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
              className="w-full px-4 py-3 border rounded text-lg"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded text-lg hover:bg-blue-600">
            회원가입
          </button>
        </form>
        <p className="mt-6 text-center text-lg">
          이미 회원이신가요?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            로그인하기
          </Link>
        </p>
        {error && <p className="mt-6 text-red-500 text-center text-lg">{error}</p>}
      </div>
    </main>
  );
}

export default SignUp;
