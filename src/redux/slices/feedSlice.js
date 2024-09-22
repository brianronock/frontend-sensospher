import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsService, createPostService, deletePostService, updatePostService, likePostService } from '../../services/feedService';

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

// Thunk for deleting a post
export const deletePost = createAsyncThunk('feed/deletePost', async (postId, thunkAPI) => {
  try {
    await deletePostService(postId);
    return postId;  // Return post ID to filter out from the state
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk for editing/updating a post
export const updatePost = createAsyncThunk('feed/updatePost', async ({ id, content }, thunkAPI) => {
  try {
    const response = await updatePostService(id, content);
    return response;  // Return the updated post
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk for liking a post
export const likePost = createAsyncThunk('feed/likePost', async (postId, thunkAPI) => {
  try {
    const response = await likePostService(postId);
    return response;  // Return the updated post with the new like count
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
      // Fetch Posts
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

      // Create Post
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
      })

      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(post => post._id !== action.payload);  // Remove deleted post
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload;  // Update the post with new content
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Like Post
    .addCase(likePost.pending, (state) => {
      state.loading = true;
    })
    .addCase(likePost.fulfilled, (state, action) => {
      state.loading = false;
      const likedPost = action.payload; // Get the post with updated like count
      const existingPost = state.posts.find(post => post._id === likedPost._id);
      if (existingPost) {
        existingPost.likes = likedPost.likes;  // Update the likes for the specific post
      }
    })
    .addCase(likePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default feedSlice.reducer;