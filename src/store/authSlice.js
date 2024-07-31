import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    email: '',
    active: false, // Initialize active state
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.auth.email = action.payload;
    },
    setActive: (state, action) => {
      state.auth.active = action.payload;
    },
    logout: (state) => {
      state.auth.email = '';
      state.auth.active = false;
    },
  },
});

export const { setEmail, setActive, logout } = authSlice.actions;
export default authSlice.reducer;