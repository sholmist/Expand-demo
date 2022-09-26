import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../slice/basketSlice";
import { categorySlice } from "../slice/categorySlice";
import { courseSlice } from "../slice/courseSlice";
import { loginSlice } from "../slice/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    basket: basketSlice.reducer,
    course: courseSlice.reducer,
    category: categorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
