import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...action.payload,
        isLogin: true,
      };
    },
    logout: (state) => {
      return {
        id: '',
        name: '',
        isLogin: false,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
