import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';

const CoinChart = ({coin}) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState();

  const { currency } = CryptoState()
  
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices)
  }

  console.log(historicalData)

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days])

  return (
    <div></div>
  )
}

export default CoinChart