import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import CreatePost from '../pages/CreatePost';
import Home from '../pages/Home';
import LogIn from '../pages/LogIn';
import MyPage from '../pages/MyPage';
import Post from '../pages/Post';
import SearchPage from '../pages/SearchPage';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <LogIn />,
      },
      {
        path: '/sign_up',
        element: <SignUp />,
      },

      {
        path: '/create_post/',
        element: <CreatePost />,
      },
      {
        path: '/post/:id',
        element: <Post />,
      },
      {
        path: '/my_page',
        element: <MyPage />,
      },
      {
        path: '/search/:keyword',
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
