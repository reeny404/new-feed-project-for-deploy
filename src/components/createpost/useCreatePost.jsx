import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "../../../node_modules/react-redux/dist/react-redux";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import supabase from "../../supabaseClient";
import { setName, setTitle, setContent, setTag, setImages, setPreviews, setUserEmail, setTitleError, setContentError, setUserId } from "../../redux/slices/postSlice";

export const useCreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, content, tag, previews, userEmail, titleError, contentError,userId } = useSelector((state) => state.post);
  const [images, setImages] = useState([])
  const [disabled, setDisabled] = useState(false)
  const hashTagRef = useRef(null);
  const titleErrorRef = useRef('제목을 입력해주세요');
  const contentErrorRef = useRef('내용을 입력해주세요');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        dispatch(setUserEmail(user.email));
        dispatch(setUserId(user.id))
      }
    };
    fetchUserData();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    if (!title.trim()) {
      dispatch(setTitleError(titleErrorRef.current));
      hasError = true;
    } else {
      dispatch(setTitleError(''));
    }

    if (!content.trim()) {
      dispatch(setContentError(contentErrorRef.current));
      hasError = true;
    } else {
      dispatch(setContentError(''));
    }

    if (hasError) {
      return;
    }

    const uploadedImageUrls = [];

    for (let image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('images')
        .upload(filePath, image);

      if (storageError) {
        alert('잘못된 접근입니다');
        return;
      } else {
        const { data, error: urlError } = supabase
          .storage
          .from('images')
          .getPublicUrl(filePath);

        if (urlError) {
          alert('잘못된 접근입니다');
          return;
        }
        uploadedImageUrls.push(data.publicUrl);
      }
    }

    const { error } = await supabase
      .from('POSTS')
      .insert([
        { name: userEmail, title, content, tag, image_url: uploadedImageUrls, user_id : userId },
      ]);

    if (error) {
      alert('잘못된 접근입니다');
    } else {
      setDisabled(true)
      alert('저장이 완료되었습니다 !');
      navigate('/');
      dispatch(setName(''));
      dispatch(setTitle(''));
      dispatch(setContent(''));
      dispatch(setTag([]));
      dispatch(setPreviews([]));
      setImages([])
    }
    setDisabled(false)
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages)

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    dispatch(setPreviews(newPreviews));
  };

  const showHashTag = () => {
    const hashTag = hashTagRef.current.value.trim();
    if (hashTag !== '') {
      dispatch(setTag([...tag, hashTag]));
      hashTagRef.current.value = '';
    }
  };

  return {
    navigate,
    handleSubmit,
    handleImageChange,
    showHashTag,
    hashTagRef,
    title,
    content,
    tag,
    images,
    previews,
    userEmail,
    titleError,
    contentError,
    disabled,
  };
};