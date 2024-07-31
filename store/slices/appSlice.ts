import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    posts: [],
    isLoading: false,
    notification: null,
    error: null,
    user: null,
    showMenu: false,
    showSearch: false,
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setShowMenu: (state, action) => {
      state.showMenu = action.payload;
    },
    setShowSearch: (state, action) => {
      state.showSearch = action.payload;
    },
  },
});

export const { setIsLoading, setNotification, setError, setUser, setShowMenu, setShowSearch } = appSlice.actions;

export default appSlice.reducer;
