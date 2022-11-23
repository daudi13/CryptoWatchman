import React, { createContext, useEffect, useState, useContext } from 'react'

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("ksh");
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currency === "usd") setSymbol("$");
    else if (currency === "aud") setSymbol("A$")
  }, [currency]);

  return (
    <Crypto.Provider value={{currency, symbol, setSymbol, setCurrency, coin, setCoin, loading, setLoading}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
  return useContext(Crypto)
}