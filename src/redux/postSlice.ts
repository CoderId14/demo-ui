import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: {
      allPosts: null,
      isFetching: false,
      error: false
    }
  },
  reducers: {
    getPostsStart: (state: any) => {
      state.posts.isFetching = true
    },
    getPostsSuccess: (state: any, action: any) => {
      state.posts.isFetching = false
      state.posts.allPosts = action.payload.allPosts
    },
    getPostsFailed: (state: any) => {
      state.posts.isFetching = false
      state.posts.error = true
    }
  }
})

export const { getPostsSuccess, getPostsFailed, getPostsStart } = postSlice.actions

export default postSlice.reducer
