import React, { useState, useEffect } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { ThemeProvider, createTheme, Container, Typography } from '@mui/material';

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [currency])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })
  
  console.log(coins)

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{margin: 18, fontFamily: "Montserrat"}}
        >
          Cryptocurrency Prices by Market cap
        </Typography>
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable