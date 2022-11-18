import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./feature/Coins/CoinSlice"

export const store = configureStore({
  reducer: {
    coins: coinReducer,
  }
})