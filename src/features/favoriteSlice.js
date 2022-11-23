import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favorites: []
}

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        // action.payload = {username, data}
        addFavorite: (state, action) => {
            let isNotFirstUser = state.favorites[action.payload.username] ? true : false
            if(isNotFirstUser) {
                state.favorites[action.payload.username] = [...state.favorites[action.payload.username], action.payload.data]
            } else {
            state.favorites[action.payload.username] = [action.payload.data]
            }
        },
        // WIP masih bingung results API-nya
        deleteFavorite: (state, action) => {
            // const filter = state.favorites[action.payload.username].filter((id) => id !== action.payload.id);
            // state.favorites[action.payload.username] = filter
            // if(state.favorites[action.payload.username].length === 0) {
            //     delete state.favorites[action.payload.username]
            // }
        }
    }
})

export const { addFavorite, deleteFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;