import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import PostList from '../components/PostList';
import { SearchInput } from '../components/SearchInput';

function SearchPage() {
  const params = useParams();
  const [keyword, setKeywrod] = useState(params.keyword ?? '');
  const [searchedPosts, setSearchedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!keyword) {
        setSearchedPosts([]);
        return;
      }
      const posts = await api.posts.search(keyword);
      setSearchedPosts(posts);
      navigate(`/search/${keyword}`);
    })();
  }, [keyword]);

  const handleSearch = (keyword) => setKeywrod(keyword);

  return (
    <>
      <SearchInput handleSearch={handleSearch} value={keyword} />
      <PostList list={searchedPosts} />
    </>
  );
}

export default SearchPage;
