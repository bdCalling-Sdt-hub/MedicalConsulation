import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";
import tokenReducer from "./apiSlices/tokenSlice";
import userReducer from "./apiSlices/userSlices";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    token: tokenReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
