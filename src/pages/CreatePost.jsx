
import React from 'react';
import Form from '../components/createpost/Form';
import Input from '../components/createpost/Input';
import ImageUpload from '../components/createpost/ImageUpload';
import HashTag from '../components/createpost/HashTag';
import Top from '../components/createpost/Top';
import { useCreatePost } from '../components/createpost/useCreatePost';


function CreatePost() {
  const {
    handleSubmit,
    handleImageChange,
    showHashTag,
    hashTagRef,
    navigate,
    disabled,
  } = useCreatePost();

  return (
    <div>
      <Form handleSubmit={handleSubmit}>
        <Top navigate={navigate} disabled={disabled}/>
        <Input />
        <ImageUpload handleImageChange={handleImageChange} />
        <HashTag hashTagRef={hashTagRef} showHashTag={showHashTag} />
      </Form>
    </div>
  );
}

export default CreatePost;