import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import favoriteReducer from './features/favoriteSlice';
import hotelReducer from './features/hotelSlice';
import bookHistoryReducer from './features/bookHistorySlice';
import loginReducer from './features/loginSlice';
import logger from 'redux-logger';
import ReviewSlice from './features/ReviewSlice';
import detailHotelSlice from './features/detailHotelSlice';
export default configureStore({
  reducer: {
    favorite: favoriteReducer,
    hotel: hotelReducer,
    bookHistory: bookHistoryReducer,
    login: loginReducer,
    review: ReviewSlice,
    detail: detailHotelSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
