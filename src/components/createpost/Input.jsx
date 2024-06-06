import React from 'react'
import './placeholder.css'
import { useDispatch, useSelector } from 'react-redux'
import { setContent, setTitle } from '../../redux/slices/postSlice'

const Input = () => {
  const dispatch = useDispatch();
  const { userEmail, title, content, titleError, contentError } = useSelector((state) => state.post);

  return (
    <section className='flex flex-col'>
      <input className='p-4 text-lg my-2.5' type="text" placeholder={userEmail} value={userEmail} readOnly />
      <input
        className={`p-4 text-lg mb-2.5 ${titleError ? 'border-red-500 placeholder-red-500' : ''}`}
        type="text"
        placeholder={titleError || '제목'}
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
      />
      <textarea
        className={`p-4 mb-2.5 resize-none w-full h-80 mb-2.5 ${contentError ? 'border-red-500 placeholder-red-500' : ''}`}
        placeholder={contentError || '내용'}
        value={content}
        onChange={(e) => dispatch(setContent(e.target.value))}
      ></textarea>
    </section>
  );
};

export default Input;