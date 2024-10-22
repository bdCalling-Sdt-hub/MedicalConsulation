import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";
import tokenReducer from "./apiSlices/tokenSlice";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(api.middleware),
});

export default store;