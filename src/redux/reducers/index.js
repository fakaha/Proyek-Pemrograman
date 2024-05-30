import { combineReducers } from "@reduxjs/toolkit";
import meSlice from "./auth/meReducer";

const rootReducers = combineReducers({
  user: meSlice,
});

export default rootReducers;
