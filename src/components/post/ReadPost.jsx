import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import supabase from '../../supabaseClient';

function ReadPost({ setIsEdit, targetData, postId, isEdit }) {
  const navigate = useNavigate();
  const signedInUser = useSelector((state) => state.auth.signedInUser);

  const { id, title, content, name, view, created_at, like, tag, image_url, user_id } = targetData;
  const postUserId = user_id;

  //!!: 값을 boolean 형태로
  const [isLoggedIn, setIsLoggedIn] = useState(!!signedInUser);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!signedInUser);
    if (signedInUser) {
      setUserId(signedInUser.id);
    } else {
      setUserId(null);
    }
  }, [signedInUser]);

  // 삭제
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    if (!isLoggedIn) return;

    const { error } = await supabase.from('POSTS').delete().eq('id', postId);

    if (error) {
      console.log(error);
      alert('다시 시도해주세요');
    } else {
      alert('삭제되었습니다');
      navigate(-1);
    }
  };

  // Like
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(like);

  //해당 게시물 해당 유저가 like 했는지 확인
  useEffect(() => {
    const checkLiked = async () => {
      if (isLoggedIn) {
        const { data, error } = await supabase
          .from('LIKES')
          .select('is_liked')
          .eq('post_id', postId)
          .eq('user_id', userId)
          .single();

        if (error) {
          console.warn(error);
        } else {
          setLiked(data.is_liked);
        }
      }
    };

    checkLiked();
  }, [isLoggedIn, postId, userId, liked]);

  //like 수 가져오기
  useEffect(() => {
    const fetchLikeCount = async () => {
      if (isLoggedIn) {
        const { data, error } = await supabase.from('POSTS').select('like').eq('id', postId).single();

        if (error) {
          console.error(error);
          alert('좋아요 수를 가져오는데에 일시적 오류가 발생했습니다');
        } else {
          setLikeCount(data.like);
        }
      }
    };

    fetchLikeCount();
  }, [isLoggedIn, liked, postId]);

  //like 클릭 이벤트
  // 클릭 시 post id,user id 대조해서 LIKES테이블에 관련 정보가 있으면 업데이트
  //없으면 INSERT
  const isLikedHandler = async () => {
    if (!isLoggedIn) {
      if (confirm('로그인 후 이용 가능합니다, 로그인 하시겠습니까?')) {
        navigate('/login');
      } else {
        return;
      }
    }

    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    const { error } = await supabase
      .from('LIKES')
      .upsert(
        {
          post_id: postId,
          user_id: userId,
          is_liked: newLikedStatus,
        },
        { onConflict: ['post_id', 'user_id'] }
      )
      .select();

    if (error) {
      console.error(error);
    } else {
      const { data: postData, error: postError } = await supabase
        .from('POSTS')
        .select('like')
        .eq('id', postId)
        .single();

      if (postError) {
        console.error(postError);
      } else {
        const newLikeCount = newLikedStatus ? postData.like + 1 : postData.like - 1;

        const { data: updatedPostData, error: updateError } = await supabase
          .from('POSTS')
          .update({ like: newLikeCount })
          .eq('id', postId)
          .select()
          .single();

        if (updateError) {
          console.error(updateError);
          alert('잠시 후 다시 시도해주세요');
        } else {
          setLikeCount(updatedPostData.like);
        }
      }
    }
  };

  //이미지 관련
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const getImages = () => {
      const urls = [];

      if (!image_url || image_url.length === 0) {
        setImageUrls([]);
        return;
      }
      for (const imageUrl of image_url) {
        urls.push(imageUrl);
      }
      setImageUrls(urls);
    };
    getImages();
  }, [image_url]);

  // View 증가
  useEffect(() => {
    const updateView = async () => {
      try {
        const { error } = await supabase
          .from('POSTS')
          .update({ view: view + 1 })
          .eq('id', postId)
          .select();
      } catch (error) {
        console.warn(error);
      }
    };

    if (view !== undefined) {
      updateView();
    }
  }, [postId, view]);

  //글 작성 버튼 눌렀을 경우의 유효성검사 및 로그인 페이지로 이동
  const onMoveToCreatePost = () => {
    if (!isLoggedIn) {
      if (confirm('로그인 후 이용 가능합니다. 로그인 하시겠어요?')) {
        return navigate('/login');
      } else {
        return;
      }
    }
    navigate('/create_post');
  };

  return (
    <article className="overflow-auto whitespace-pre-wrap break-words">
      <section className=" bg-gray-200 flex flex-col flex-1 gap-2 justify-center py-4 px-4 mb-3">
        <h1 className="pl-3 text-2xl">{title}</h1>
        <div className="flex justify-between items-center mt-4">
          <p className="pl-3 font-bold text-base">{name}</p>
          <p className="text-base font-bold">{created_at}</p>
        </div>
      </section>

      <section className="bg-gray-200 h-auto p-8 border-b border-black mb-3">
        <EditButtonDiv $editAuthority={isLoggedIn && postUserId === userId} className="mb-4">
          <button onClick={() => setIsEdit(true)}>수정</button> | <button onClick={handleDelete}>삭제</button>
        </EditButtonDiv>
        {imageUrls.length > 0
          ? imageUrls.map((url, index) => <img key={index} src={url} alt={`post-image-${index}`} />)
          : null}

        <p className="text-lg leading-loose">{content}</p>
      </section>

      <ReactionSection className=" h-[15vh] flex flex-col pt-4 pl-8 pb-0 border-b border-black">
        <ReactionDiv $isLiked={liked}>
          <div className="mb-3 font-bold">조회수 : {view}</div>
          <div className="font-bold">
            <FontAwesomeIcon icon="fa-solid fa-heart" className="heart" onClick={isLikedHandler} /> {like}
          </div>
        </ReactionDiv>
        <div className="flex-row font-bold">
          {tag && !isEdit && tag.length > 0 ? tag.map((item, index) => <span key={index}>#{item} </span>) : null}
        </div>
      </ReactionSection>

      <section className="h-[10vh] flex justify-center items-center gap-[2vw]">
        <button className="cursor-pointer text-2xl py-2 px-4 text-[1.4rem] font-bold" onClick={() => navigate(-1)}>
          뒤로가기
        </button>
        <button className="cursor-pointer text-2xl py-2 px-4 text-[1.4rem] font-bold" onClick={onMoveToCreatePost}>
          글 작성
        </button>
      </section>
    </article>
  );
}

const EditButtonDiv = styled.div`
  display: ${(props) => (props.$editAuthority ? 'flex' : 'none')};
  justify-content: end;
`;

const ReactionSection = styled.section`
  border-bottom: 1px solid black;
`;
const ReactionDiv = styled.div`
  flex-direction: row;
  margin-bottom: 1rem;

  & .heart {
    color: ${(props) => (props.$isLiked ? 'red' : 'black')};
    cursor: pointer;
  }
`;

export default ReadPost;
