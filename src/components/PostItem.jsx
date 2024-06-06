import { Link } from 'react-router-dom';
import heartImg from '../assets/heart.png';
import visibleImg from '../assets/visible.png';

/**
 *
 * @param post
 * @returns
 */
function PostItem({ post }) {
  return (
    <div className="h-10 flex items-center justify-between">
      <Link to={`/post/${post.id}`} className="flex-1 text-ellipsis text-nowrap overflow-hidden">
        <span>{post.title}</span>
      </Link>
      <span className="h-full flex-col w-8 text-center flex items-center justify-start text-gray-700 flex-[0_0_auto]">
        <img src={visibleImg} className="h-2/4 opacity-70" />
        <span className="text-xs">{post.view}</span>
      </span>
      <span className="h-full flex-col w-8 text-center flex items-center justify-start text-gray-700 flex-[0_0_auto] ml-2">
        <img src={heartImg} className="h-2/4 opacity-50" />
        <span className="text-xs">{post.like}</span>
      </span>
    </div>
  );
}

export default PostItem;
