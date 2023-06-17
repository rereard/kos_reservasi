import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOnApp: false,
};

const onAppSlice = createSlice({
  name: 'onApp',
  initialState,
  reducers: {
    setIsOnApp: (state, action) => {
      state.isOnApp = action.payload
    }
  }
})

export const { setIsOnApp } = onAppSlice.actions;
export default onAppSlice.reducer;