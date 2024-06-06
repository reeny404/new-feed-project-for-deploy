// src/App.jsx

import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './components/globalstyle/GlobalStyle';
import router from './shared/Router'; // router 임포트
import { useEffect } from 'react';
import supabase from './supabaseClient';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === 'SIGNED_OUT') {
        dispatch(setUser(null));
      } else if (session) {
        dispatch(setUser(session.user));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
