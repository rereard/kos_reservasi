import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isPending: false,
    isSuccess: false,
    errorMessage: '',
    hotels: [],
}

export const fetchHotels = createAsyncThunk('hotels/fetchHotels', async () => {
    try {
        const response = await axios.get('https://')
        return response.data
    } catch (e) {
        throw(e)
    }
})

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
        .addCase(fetchHotels.pending, (state) => {
            state.isPending = true
            state.isSuccess = false
            state.errorMessage = ''
        })
        .addCase(fetchHotels.rejected, (state, action) => {
            state.isPending = false
            state.isSuccess = false
            state.errorMessage = action.error.message
        })
        .addCase(fetchHotels.fulfilled, (state, action) => {
            state.products = action.payload
            state.isSuccess = true
            state.isPending = false
            state.loading = false
            state.errorMessage = ''
        })
    }
})
export const {  } = hotelSlice.actions
export default hotelSlice.reducer