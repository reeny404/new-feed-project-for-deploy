import React from 'react'
import { useSelector } from 'react-redux'

const HashTag = ({ hashTagRef, showHashTag }) => {
  const { tag } = useSelector((state) => state.post);

  return (
    <section className='my-4'>
      <div className='flex flex-row items-center justify-end mr-4'>
        <input className='w-4/12 p-2.5 rounded-2xl border-none' ref={hashTagRef} type="text" placeholder='#해시태그' />
        <button className='ml-2.5 bg-white p-2.5 rounded-lg hover:bg-slate-300 hover:text-white hover:duration-200' type='button' onClick={showHashTag}>태그 등록</button>
      </div>
      <div className='flex flex-row justify-end mr-4 mt-4'>
        <ul className='flex-row flex flex-wrap justify-end'>
          {tag.map((item, index) => (
            <li className='my-2.5 mx-1.5 bg-white p-2.5 rounded-2xl text-center' key={index}><span className='py-1.5 px-2.5'>{item}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HashTag;