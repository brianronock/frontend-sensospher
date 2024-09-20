import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsService, createPostService } from '../../services/feedService';

// Thunk for fetching posts
export const fetchPosts = createAsyncThunk('feed/fetchPosts', async (_, thunkAPI) => {
  try {
    const response = await fetchPostsService();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk for creating a post
export const createPost = createAsyncThunk('feed/createPost', async (postData, thunkAPI) => {
  try {
    const response = await createPostService(postData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);  // Add the new post
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedSlice.reducer;