import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi } from "shared/api/baseApi";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
