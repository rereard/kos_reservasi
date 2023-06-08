import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      // action.payload = user data
      setUser: (state, action) => {
        state.user = action.payload.auth;
        state.user.pass = action.payload.pass
        state.user.phone = action.payload.phone
      },
      removeLogin: (state) => {
        state.user = null;
      },
      updateUser: (state, action) => {
        state.user[action.payload.prop] = action.payload.value
      }
    },
  });
  
  export const { setUser, removeLogin, updateUser } = loginSlice.actions;
  export default loginSlice.reducer;