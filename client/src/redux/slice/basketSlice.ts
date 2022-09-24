import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../actions/agent";
import { Basket } from "../../models/basket";

interface BasketState {
  basket: Basket | null | undefined;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  Basket | undefined,
  { courseId: string }
>("basket/addBasketItemAsync", async ({ courseId }) => {
  try {
    return await agent.Baskets.addItem(courseId);
  } catch (error) {
    console.log(error);
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
      const { courseId } = action.payload;
      const itemIndex = state.basket?.items.findIndex(
        (item) => item.courseId === courseId
      );
      if (itemIndex === undefined || itemIndex === -1) return;
      state.basket?.items.splice(itemIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBasketItemAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addBasketItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.basket = action.payload;
      })
      .addCase(addBasketItemAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const { setBasket, removeItem } = basketSlice.actions;
