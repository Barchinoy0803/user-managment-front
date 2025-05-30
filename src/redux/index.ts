import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./api/";
import users from "./features/users.slice"

export const store = configureStore({
  reducer: {
    users,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
