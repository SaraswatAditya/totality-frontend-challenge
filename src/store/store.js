import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import apiReducer from "../features/api/apiSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import the storage from redux-persist
import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  api: apiReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
          'api/fetchUserData/fulfilled',
          'api/fetchUserData/rejected'
        ],
      },
    }),
});

const persistor = persistStore(store); // Create the persistor

export { store, persistor }; // Export both store and persistor