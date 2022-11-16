import React, { createContext, useEffect, useState, useContext } from 'react'

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("ksh");
  const [symbol, setSymbol] = useState("ksh");

  useEffect(() => {
    if (currency === "ksh") setSymbol("ksh");
    else if (currency === "tsh") setSymbol("tsh")
  }, [currency]);

  return (
    <Crypto.Provider value={{currency, symbol, setSymbol, setCurrency}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
  return useContext(Crypto)
}