import { useEffect, useState } from 'react';
import supabase from '../../supabaseClient';

function EditPost({ targetData, setTargetData, setIsEdit, postId }) {
  const { title, content, tag, image_url } = targetData;

  const onChangeHandler = (e) => {
    if (e.target.name === 'tag') {
      const tags = e.target.value.split(',').map((tag) => tag.trim());
      setTargetData({ ...targetData, [e.target.name]: tags });
    } else {
      setTargetData({ ...targetData, [e.target.name]: e.target.value });
    }
  };

  const editHandler = async () => {
    if (!title || !content) return alert('제목, 내용은 공백 작성 불가합니다');
    const { error } = await supabase
      .from('POSTS')
      .update({
        title: title,
        content: content,
        tag: tag,
      })
      .eq('id', postId);
    if (error) {
      console.error(error);
      alert('수정 실패. 잠시 후 다시 시도해주세요');
    } else {
      alert('수정되었습니다');
      setIsEdit(false);
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

  return (
    <div className="bg-gray-200 h-[70vh] flex flex-col">
      <label className="mb-4 mt-4 font-bold">제목</label>
      <input className="h-[6vh] mb-6" type="text" value={title} name="title" onChange={onChangeHandler} />
      <label className="mb-4 font-bold">내용</label>
      <div className="flex">
        {imageUrls.length > 0
          ? imageUrls.map((url, index) => <img className="w-48" key={index} src={url} alt={`post-image-${index}`} />)
          : null}
      </div>

      <textarea
        className="h-[30vh] mb-4 resize-none"
        type="text"
        value={content}
        name="content"
        onChange={onChangeHandler}
      />
      <label className="mb-4 font-bold">태그</label>
      <input
        type="text"
        value={tag}
        name="tag"
        onChange={onChangeHandler}
        placeholder="태그는 ,를 기준으로 하나씩 작성 부탁드립니다"
      />
      <div className="mt-16 flex justify-end items-center">
        <button className="bg-gray-700 mr-2  rounded-2xl p-2 text-white" onClick={editHandler}>
          수정 완료
        </button>
        <button className="mr-4 bg-gray-400 rounded-2xl p-2 text-white" onClick={() => setIsEdit(false)}>
          취소
        </button>
      </div>
    </div>
  );
}

export default EditPost;
