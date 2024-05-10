import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    posts: [],
    isLoading: false,
    notification: null,
    error: null,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.notification = null;
    },
  },
});

export const { setIsLoading, setNotification, setError } = appSlice.actions;

export default appSlice.reducer;
