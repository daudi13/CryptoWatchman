import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TrendingCoins } from "../../config/api";

const url = TrendingCoins('ksh');

const initialState = {
  coinsItems: [],
  isLoading: true
}

export const getCoinsItems = createAsyncThunk(
  'coins/getCoinsItems',
  async () => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
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
    [getCoinsItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.coinsItems = action.payload;
    },
    [getCoinsItems.rejected]: (state) => {
      state.isLoading = false;
    },
  }
})

export default coinSlice.reducer