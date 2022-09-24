import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  visits: number;
}

export const initialState: LoginState = {
  visits: 1,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.visits += action.payload;
    },
  },
});

export const { increment } = loginSlice.actions;
