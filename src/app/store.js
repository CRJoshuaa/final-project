import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";

export const store = configureStore({
  reducer: {
    app: appReducer,

    // [cryptoApi.reducerPath]: cryptoApi.reducer,
    // [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});
