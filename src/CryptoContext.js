import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CoinList } from './config/api';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("ksh");
  const [coin, setCoin] = useState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

    const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data);
    setLoading(false);
  }

  useEffect(() => {
    if (currency === "usd") setSymbol("$");
    else if (currency === "aud") setSymbol("A$")
  }, [currency]);

  return (
    <Crypto.Provider value={{currency, symbol, setSymbol, setCurrency, coin, setCoin, loading, setLoading, fetchCoins, coins, setCoins}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
  return useContext(Crypto)
}