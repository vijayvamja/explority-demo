import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./reducer/dashboard";


export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
