import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSLice";

export default configureStore({
  reducer: {
    authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
