import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import pencil from '../assets/pencil.png';
import PostList from '../components/PostList';
import RecentPosts from '../components/RecentPosts';
import { SearchInput } from '../components/SearchInput';

function Home() {
  const [popularPosts, setPopularPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setPopularPosts(await api.posts.getPopularPosts());
    })();
  }, []);

  const handleSearch = async (keyword) => {
    navigate(`/search/${keyword}`);
  };

  return (
    <main>
      <SearchInput handleSearch={handleSearch} />
      <section>
        <PostList title="인기 글" list={popularPosts} />
        <RecentPosts title="최신 글" />
      </section>
      <div className="flex justify-end items-center pr-3">
        <Link
          to="/create_post"
          className="fixed bottom-3 rounded w-10 h-10 flex justify-center items-center bg-gray-300 hover:bg-white"
        >
          <img src={pencil} className="w-8 hover:opacity-80" />
        </Link>
      </div>
    </main>
  );
}

export default Home;
