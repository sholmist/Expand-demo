import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
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

function getCookie(name: string) {
  return (
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""
  );
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
  "basket/fetchBasketAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Baskets.get();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
  {
    condition: () => {
      if (!getCookie("clientId")) return false;
    },
  }
);

export const addBasketItemAsync = createAsyncThunk<
  Basket | undefined,
  { courseId: string }
>("basket/addBasketItemAsync", async ({ courseId }, thunkAPI) => {
  try {
    return await agent.Baskets.addItem(courseId);
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { courseId: string }
>("basket/removeBasketItemAsync", async ({ courseId }, thunkAPI) => {
  try {
    await agent.Baskets.removeItem(courseId);
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBasketItemAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeBasketItemAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeBasketItemAsync.fulfilled, (state, action) => {
        const { courseId } = action.meta.arg;
        const itemIndex = state.basket?.items.findIndex(
          (item) => item.courseId === courseId
        );
        if (itemIndex === undefined || itemIndex === -1) return;
        state.basket?.items.splice(itemIndex, 1);
        state.status = "idle";
      })
      .addCase(removeBasketItemAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addMatcher(
        isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
        (state, action) => {
          state.status = "idle";
          state.basket = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
        (state) => {
          state.status = "idle";
        }
      );
  },
});

export const { setBasket } = basketSlice.actions;
