import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import appointmentsReducer from "../features/appointments/appointmentsSlice";

// The reducer key "auth" is what useSelector((s) => s.auth) reads.
export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentsReducer,
  },
});
