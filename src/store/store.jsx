import { configureStore } from '@reduxjs/toolkit';
import  SearchData  from '../reducers/SearchData';
import  RowKeys from '../reducers/selectedRowKeys';

import thunk from 'redux-thunk';
import autoMergeLevel2 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2';

import { combineReducers } from 'redux';
import {
      persistStore,
      persistReducer
} from 'reduxjs-toolkit-persist'

import localforage from 'localforage';

const rootReducer = combineReducers({
      Search: SearchData,
      selectedRowKeys: RowKeys,
});

const persistConfig = {
      key: 'root',
      stateReconciler: autoMergeLevel2,
      storage: localforage,
    }
// комбинируем редьюсеры

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
      reducer: persistedReducer,
  
      
      middleware: [thunk]

     })
     

export const persistor = persistStore(store);
