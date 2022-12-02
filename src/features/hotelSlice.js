import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isPending: false,
  isSuccess: false,
  errorMessage: '',
  hotels: [],
  searchId: '',
};

export const fetchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async props => {
    const {location, checkIn, checkOut, guests, rooms} = props;
    try {
      const responseLocation = await axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_URL}/locations/auto-complete`,
        params: {text: location, languagecode: 'id'},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        },
      });
      const findDestType = responseLocation.data.find(
        result => result.dest_type === 'city',
      );
      const responseHotels = await axios.request({
        method: 'GET',
        url: `${process.env.REACT_APP_URL}/properties/list`,
        params: {
          offset: '0',
          arrival_date: checkIn,
          departure_date: checkOut,
          guest_qty: guests,
          dest_ids: findDestType.dest_id,
          room_qty: rooms,
          search_type: 'city',
          search_id: 'none',
          price_filter_currencycode: 'IDR',
          order_by: 'popularity',
          languagecode: 'id',
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
        },
      });
      console.log("api",process.env.REACT_APP_API_KEY);
      return [responseHotels.data.result, responseHotels.data.search_id];
    } catch (e) {
      throw e;
    }
  },
);

console.log(process.env.REACT_APP_API_KEY);

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHotels.pending, state => {
        state.isPending = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.isPending = false;
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.hotels = action.payload[0];
        state.searchId = action.payload[1];
        state.isSuccess = true;
        state.isPending = false;
        state.loading = false;
        state.errorMessage = '';
      });
  },
});
export const {} = hotelSlice.actions;
export default hotelSlice.reducer;
