import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookHistories: []
}

const bookHistorySlice = createSlice({
    name: "bookHistory",
    initialState,
    reducers: {
        // action.payload = {username, data}
        addBookHistory: (state, action) => {
            let isNotFirstUser = state.bookHistories[action.payload.username] ? true : false
            if(isNotFirstUser) {
                state.bookHistories[action.payload.username] = [...state.bookHistories[action.payload.username], action.payload.data]
            } else {
            state.bookHistories[action.payload.username] = [action.payload.data]
            }
        },
        // WIP masih bingung results API-nya
        deleteBookHistory: (state, action) => {
            // const filter = state.bookHistories[action.payload.username].filter((id) => id !== action.payload.id);
            // state.bookHistories[action.payload.username] = filter
            // if(state.bookHistories[action.payload.username].length === 0) {
            //     delete state.bookHistories[action.payload.username]
            // }
        }
    }
})

export const { addBookHistory, deleteBookHistory } = bookHistorySlice.actions;
export default bookHistorySlice.reducer;
