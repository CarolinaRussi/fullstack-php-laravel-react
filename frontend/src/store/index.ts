import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import solicitationReducer from "./solicitationSlice";
import adminSolicitationsReducer from "./adminSolicitationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    solicitations: solicitationReducer,
    adminSolicitations: adminSolicitationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
