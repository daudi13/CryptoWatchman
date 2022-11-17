import { makeStyles } from 'tss-react/mui'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CryptoState } from '../../CryptoContext'
import { TrendingCoins } from '../../config/api'

const useStyles = makeStyles()((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  }
}))

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency } = CryptoState(); 
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data)
  }

  console.log(trending)

  useEffect(() => {
    fetchTrendingCoins();
  },[currency])

  const { classes } = useStyles();
  return (
    <div className={classes.carousel}>Carousel</div>
  )
}

export default Carousel