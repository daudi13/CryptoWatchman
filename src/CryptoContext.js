import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CoinList } from './config/api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("ksh");
  const [coin, setCoin] = useState();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setuser] = useState(null);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  })

    const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data);
    setLoading(false);
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setuser(user)
      else setuser(null)
    })
  })

  useEffect(() => {
    if (currency === "usd") setSymbol("$");
    else if (currency === "aud") setSymbol("A$")
  }, [currency]);

  return (
    <Crypto.Provider value={{
      currency,
      symbol,
      setSymbol,
      setCurrency,
      coin,
      setCoin,
      loading,
      setLoading,
      fetchCoins,
      coins,
      setCoins,
      open,
      setOpen,
      alert,
      setAlert,
      user
    }}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
  return useContext(Crypto)
}