import { configureStore, combineReducers } from '@reduxjs/toolkit';
import EventReducer from './reducer/EventReducer';
import userReducer from './reducer/userReducer';
import bookingReducer from './reducer/bookingReducer';
import persistStore from 'redux-persist/es/persistStore';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage'



  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  
  const rootReducer = combineReducers({
    event: EventReducer,
    user: userReducer,
    book:bookingReducer
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  // Create the Redux store
  export const store = configureStore({
    reducer: persistedReducer,
    middleware:()=>{return []}
  });
  
  export const clearPersistedStore = () => {
    return new Promise((resolve, reject) => {
      persistor.purge()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  // Create the persistor
  export const persistor = persistStore(store);
  
