import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import PostItem from './PostItem';

function PostList({ title, list }) {
  const [isLoading, setIsLoading] = useState(list.length);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(list.length);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <section className="bg-gray-100 pl-3 pr-2 py-3 mb-3 ">
      {title ? <h2 className="py-1 font-bold">{title}</h2> : ''}
      <ul className="py-3">
        {isLoading ? (
          <Loading />
        ) : list.length === 0 ? (
          <div className="text-center">
            <div className="p-3">관련 글이 없어요</div>
            <Link to="/create_post">
              <div className="py-2 w-3/4 bg-white rounded text-sm m-auto">🏃‍♂️🏃‍♀️🏃 글 쓰러 가기 🏃‍♂️🏃‍♀️🏃</div>
            </Link>
          </div>
        ) : (
          list.map((post, i) => (
            <li key={i}>
              <PostItem post={post} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}

export default PostList;
