import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import listingSlice from '../slices/listingSlice';
import userRoomSlice from '../slices/userRoomSlice';
import inviteSlice from '../slices/inviteSlice';
import notificationSlice from '../slices/notificationSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const reducers = combineReducers({
  auth: authSlice,
  listing: listingSlice,
  userRoom: userRoomSlice,
  invite: inviteSlice,
  notification: notificationSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);


export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
