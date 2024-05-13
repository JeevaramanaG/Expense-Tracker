import { createSlice } from "@reduxjs/toolkit";

// Initial State
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },

  // Reducers
  reducers: {
    LoginAction: (state, action) => {
      state.user = action.payload;
    },
    LogoutAction: (state, action) => {
      state.user = null;
    },
  },
});

export const { LoginAction, LogoutAction } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
