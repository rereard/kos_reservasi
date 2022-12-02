import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import favoriteReducer from './features/favoriteSlice';
import hotelReducer from './features/hotelSlice';
import bookHistoryReducer from './features/bookHistorySlice';
import loginReducer from './features/loginSlice';
import logger from 'redux-logger';
import ReviewSlice from './features/ReviewSlice';
import detailHotelSlice from './features/detailHotelSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import getRoomsSlice from './features/getRoomsSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['hotel', 'review', 'detail', 'review', 'rooms'],
};

const rootReducer = combineReducers({
  favorite: favoriteReducer,
  bookHistory: bookHistoryReducer,
  login: loginReducer,
  hotel: hotelReducer,
  review: ReviewSlice,
  detail: detailHotelSlice,
  rooms: getRoomsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});
