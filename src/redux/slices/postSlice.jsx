import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name :'',
  title : '',
  content :'',
  tag : [],
  previews : [],
  userEmail : '',
  titleError : '',
  contentError : '',
  userId : '',
}

const postSlice = createSlice({
  name : 'post',
  initialState,
  reducers : {
    setName : (state, action) => {
      state.name = action.payload
    },
    setTitle : (state, action) => {
      state.title = action.payload
    },
    setContent : (state, action) => {
      state.content = action.payload
    },
    setTag : (state, action) => {
      state.tag = action.payload
    },
    setPreviews : (state, action) => {
      state.previews = action.payload
    },
    setUserEmail : (state, action) => {
      state.userEmail = action.payload
    },
    setTitleError : (state, action) => {
      state.titleError = action.payload
    },
    setContentError : (state, action) => {
      state.contentError = action.payload
    },
    setUserId : (state, action) => {
      state.userId = action.payload
    }
  }
})
export const {
  setName,
  setTitle,
  setContent,
  setTag,
  setImages,
  setPreviews,
  setUserEmail,
  setTitleError,
  setContentError,
  setUserId
} = postSlice.actions

export default postSlice.reducer