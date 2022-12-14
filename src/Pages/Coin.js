import { Typography, LinearProgress, Button } from '@mui/material';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import parse from 'html-react-parser';
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui';
import CoinChart from '../components/CoinChart';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { db } from '../firebase';
import ReadMoreReact from 'read-more-react';

const Coin = () => {
  const { id } = useParams();
  const {currency, symbol, coin, setCoin, setLoading, user, watchlist, setAlert} = CryptoState();
  
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setLoading(false)
  }

  const desc = parse(`${coin?.description.en}`)

  useEffect(() => {
    fetchCoin()
    // eslint-disable-next-line
  }, [])

  const useStyles = makeStyles()((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      }
    },
    sidebar: {
      width: "40%",
      [theme.breakpoints.down("md")]: {
        width: "100%"
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey"
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat"
    },
    info: {
      alignSelf: "start",
      paddingLeft: 25,
      paddingBottom: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }, 
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "start"
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start"
      }
    },
    description: {
      padding: 30,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "left",
      fontFamily: "Montserrat",
      lineHeight: "20px",
      fontSize: "15px",
    },
    fig: {
      fontWeight: "lighter"
    },
    add: {
      marginTop: 20,
      width: "90%",
      padding: 10,
      [theme.breakpoints.down("md")]: {
        width: "50%"
      }
    }
  }))

  const { classes } = useStyles()

  const inWatchList = watchlist.includes(coin?.id);

  const addToWatchList = async() => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
      setAlert({
        open: true,
        message: `${coin.name} Added to the watchlist!`,
        type: "success",
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    }
  }

  const removeFromWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch) => watch !== coin?.id),
      },
      { merge: "true"}
      );
      setAlert({
        open: true,
        message: `${coin.name} removed from watchlist!`,
        type: "success",
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    }
  }

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }}/>

  return (
    <div className={classes.container}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>????CryptoWatchMan | {id}</title>
      </Helmet>
    <div className={classes.sidebar}>
      <img
        src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{marginBottom: 20}}
      />
      <Typography
        variant='h3'
        className={classes.heading}
      >
        {coin?.name}
      </Typography>
      <Typography
        variant='subtitle1'
        className={classes.description}
        >
          {
            desc
          }
      </Typography>
      <div className={classes.info}>
        <Typography variant="h5" style={{marginBottom: "7px", AlignItems: "start"}} className={classes.heading}>Rank: <span className={classes.fig}>{coin?.coingecko_rank}</span></Typography>
        <Typography variant="h5" style={{ marginBottom: "7px", AlignItems: "start" }} className={classes.heading}>Current Price:<span className={classes.fig}> {symbol}
        {coin?.market_data.current_price[currency.toLowerCase()].toFixed(2)}
        </span></Typography>
          <Typography variant="h5" style={{ marginBottom: "7px", AlignItems: "start" }} className={classes.heading}>Market cap:<span className={classes.fig}> {(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M</span></Typography>
          {user &&
            <Button variant='contained'
              onClick={inWatchList ? removeFromWatchList : addToWatchList}
              className={classes.add}
              style={{
                backgroundColor: inWatchList && "#ff0000"
              }}
            >
              {inWatchList ? "Remove from Watchlist" : `Add to wishList`}
            </Button>}
      </div>
    </div>
    <CoinChart coin={coin} />
  </div>
  )
}

export default Coin