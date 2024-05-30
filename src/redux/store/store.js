import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../reducers/index";
import thunk from "redux-thunk";

export default configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
