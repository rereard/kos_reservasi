import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isPending: false,
  isSuccess: false,
  errorMessage: '',
  rooms: [],
};

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async props => {
  const {hotel_id, checkOut, checkIn, guests, rooms} = props;
  try {
    const response = await axios.get(
      'https://apidojo-booking-v1.p.rapidapi.com/properties/v2/get-rooms',
      {
        params: {
          hotel_id: hotel_id,
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
    return response.data[0];
  } catch (err) {
    throw err;
  }
});

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRooms.pending, state => {
        state.isPending = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.isPending = false;
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.isSuccess = true;
        state.isPending = false;
        state.loading = false;
        state.errorMessage = '';
      });
  },
});
export const {} = roomsSlice.actions;
export default roomsSlice.reducer;
