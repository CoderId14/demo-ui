import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import authReducer from './authSlice'
import postReducer from './postSlice'
import userReducer from './userSlice'
import checkReducer from './checkSlice'

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  user: userReducer,
  check: checkReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  ]
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export const selectAuth = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.user
export const selectCheck = (state: RootState) => state.check

export type AppDispatch = typeof store.dispatch
