// src/App.jsx

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './components/globalstyle/GlobalStyle';
import { setUser } from './redux/slices/authSlice';
import router from './shared/Router'; // router 임포트
import supabase from './supabaseClient';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange((event, session) => {
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
