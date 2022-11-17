import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TrendingCoins } from "../../config/api";

const url = TrendingCoins(currency);

const initialState = {
  coinsItems: [],
  isLoading: true
}

export const getCoinsItems = createAsyncThunk(
  'coins/getCoinsItems',
  async () => {
    try {
      const resp = await axios(url);
      return resp;
    } catch (error) {
      console.log(error)
    }
  }
);

const coinSlice = createSlice({
  name: 'coins',
  initialState,
  extraReducers: {
    [getCoinsItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCoinsItems.fulfilled]: (state) => {
      state.isLoading = false;
      state.coinsItems = action.payload;
    },
    [getCoinsItems.rejected]: (state) => {
      state.isLoading = false;
    },
  }
})

console.log(coinSlice);

export default coinSlice.reducer