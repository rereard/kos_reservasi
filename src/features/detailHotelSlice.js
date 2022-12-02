import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isPending: false,
  isSuccess: false,
  errorMessage: '',
  detail: [],
};

export const fetchDetail = createAsyncThunk(
  'detail/fetchDetail',
  async props => {
    const {hotel_id, checkOut, checkIn, guests, rooms} = props;
    try {
      const response = await axios.get(
        'https://apidojo-booking-v1.p.rapidapi.com/properties/detail',
        {
          params: {
            hotel_id: hotel_id,
            search_id: 'none',
            departure_date: checkOut,
            arrival_date: checkIn,
            rec_guest_qty: guests,
            rec_room_qty: rooms,
            currency_code: 'IDR',
            languagecode: 'id',
          },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
          },
        },
      );
      console.log("api",process.env.REACT_APP_API_KEY);
      return response.data[0];
    } catch (err) {
      throw err;
    }
  },
);

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDetail.pending, state => {
        state.isPending = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchDetail.rejected, (state, action) => {
        state.isPending = false;
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.isSuccess = true;
        state.isPending = false;
        state.loading = false;
        state.errorMessage = '';
      });
  },
});
export const {} = detailSlice.actions;
export default detailSlice.reducer;
