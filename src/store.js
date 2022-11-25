import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import favoriteReducer from './features/favoriteSlice';
import hotelReducer from './features/hotelSlice';
import bookHistoryReducer from './features/bookHistorySlice';
import loginReducer from './features/loginSlice';
import logger from "redux-logger"
export default configureStore({
  reducer: {
    favorite: favoriteReducer,
    hotel: hotelReducer,
    bookHistory: bookHistoryReducer,
    login: loginReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
