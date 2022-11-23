import {configureStore} from '@reduxjs/toolkit';
import favoriteReducer from './features/favoriteSlice';
import hotelReducer from './features/hotelSlice';
import bookHistoryReducer from './features/bookHistorySlice';
export default configureStore({
  reducer: {
    favorite: favoriteReducer,
    hotel: hotelReducer,
    bookHistory: bookHistoryReducer,
  },
});
