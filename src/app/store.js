import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskReducer";

export const store = configureStore({
  reducer: {
    task: taskReducer
  }
});