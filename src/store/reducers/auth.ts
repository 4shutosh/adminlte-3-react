import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  currentUser: any;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  currentUser: {
    email: localStorage.getItem('userEmail'),
    name: localStorage.getItem('userName'),
    picture: localStorage.getItem('userPicture')
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, {payload}) => {
      localStorage.setItem('token', payload.accessToken);
      state.isLoggedIn = true;
      state.token = payload;
    },
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.currentUser = {};
      state.isLoggedIn = false;
      state.token = null;
    },
    loadUser: (state, {payload}) => {
      state.currentUser = payload;
    }
  }
});

export const {loginUser, logoutUser, loadUser} = authSlice.actions;

export default authSlice.reducer;
