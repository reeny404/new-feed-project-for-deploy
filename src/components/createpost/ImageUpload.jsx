import React from 'react'
import { useSelector } from 'react-redux'

const ImageUpload = ({ handleImageChange }) => {
  const { previews } = useSelector((state) => state.post);

  return (
    <section className='mx-4 my-4'>
      <div className='flex justify-end'>
        <label htmlFor="image-upload" className='cursor-pointer bg-white p-2.5 rounded-lg hover:bg-slate-300 hover:text-white hover:duration-200'>이미지 업로드</label>
        <input className='hidden' id='image-upload' type="file" accept='image/*' multiple onChange={handleImageChange} />
      </div>
      <div className='mt-6 flex flex-row flex-wrap justify-end'>
        {previews.map((preview, index) => (
          <img key={index} src={preview} alt={`preview-${index}`} className='w-28 m-2.5' />
        ))}
      </div>
    </section>
  );
};

export default ImageUpload;