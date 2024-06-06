//src>components>SignInBtn.jsx

import { supabase } from '../supabaseClient';

function SignInBtn() {
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return <button onClick={signInWithGithub}
  className="w-full bg-blue-500 text-white py-3 rounded text-lg hover:bg-blue-600 flex justify-center">깃허브로 로그인</button>;
}

export default SignInBtn;

