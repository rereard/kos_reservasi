import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isPending: false,
  isSuccess: false,
  errorMessage: '',
  review: [],
};

export const fetchReview = createAsyncThunk(
  'review/fetchReview',
  async props => {
    const {hotel_id} = props;
    try {
      const response = await axios.get(
        'https://apidojo-booking-v1.p.rapidapi.com/reviews/list',
        {
          params: {
            hotel_ids: hotel_id,
            languagecode: 'id',
          },
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
            'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
          },
        },
      );
      console.log("api",process.env.REACT_APP_API_KEY);
      return response.data.result;
    } catch (err) {
      throw err;
    }
  },
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReview.pending, state => {
        state.isPending = true;
        state.isSuccess = false;
        state.errorMessage = '';
      })
      .addCase(fetchReview.rejected, (state, action) => {
        state.isPending = false;
        state.isSuccess = false;
        state.errorMessage = action.error.message;
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.review = action.payload;
        state.isSuccess = true;
        state.isPending = false;
        state.loading = false;
        state.errorMessage = '';
      });
  },
});
export const {} = reviewSlice.actions;
export default reviewSlice.reducer;
