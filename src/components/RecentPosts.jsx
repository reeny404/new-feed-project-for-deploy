import { useCallback, useEffect, useState } from 'react';
import api from '../api/api';
import PostList from './PostList';

const POSTS_OFFSET = 13;

function RecentPosts({ title }) {
  const [pageNo, setPageNo] = useState(0);
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    (async () => {
      api.posts.getRecentPosts({ startNo: pageNo, rownum: POSTS_OFFSET }).then((list) => {
        if (list.length === 0) {
          setHasNextPage(false);
          return;
        }
        setPosts((posts) => {
          const newList = [...posts, ...list];
          return newList;
        });
      });
    })();
  }, [pageNo]);

  const handleScrollEvent = useCallback(async () => {
    const element = document.documentElement;
    const scorllableHeight = element.scrollHeight - element.clientHeight;
    const restScrollHeight = scorllableHeight - scrollY;
    if (!hasNextPage || restScrollHeight > 5) {
      return;
    }
    setPageNo((pageNo) => pageNo + POSTS_OFFSET + 1);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return <PostList title={title} list={posts} />;
}

export default RecentPosts;
