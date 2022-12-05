import React from 'react'
import { CryptoState } from '../CryptoContext'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Avatar } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import Button from '@mui/material/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import{ FaTrash }from 'react-icons/fa'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins } = CryptoState();

  console.log(watchlist);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

    const logout = () => {
    signOut(auth);
      setAlert({
        open: true,
        message: "You've successfully logged out",
        type: "success"
      });
      toggleDrawer();
  }

  const useStyles = makeStyles()(() => ({
    container: {
      width: 350,
      padding: 25,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "monospace",
      overflow: "hidden",

    },
    profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%"
    },
    picture: {
      width: 200,
      height: 200,
      cursor: "pointer",
      background: "#eebc1d",
      objectFit: "contain"
    },
    watchList: {
      flex: 1,
      width: "100%",
      backgroundColor: "grey",
      borderRadius: 10,
      padding: 15,
      paddingTop: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
      overflowY: "scroll",
    },
    coin: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      margin: 1,
      backgroundColor: "gold",
      color: 'black',
      width: "100%",
      borderRadius: 2,
      gap: 2,
      wordSpacing: 1
    },
    trash: {
      cursor: "pointer"
    }
  }))

  const { classes } = useStyles();

    const removeFromWatchList = async (coinId) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist.filter((watch) => watch !== coinId),
      },
      { merge: "true"}
      );
      setAlert({
        open: true,
        message: `removed from watchlist!`,
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

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      className={classes.container}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.container}>
        <div className={classes.profile}>
          <Avatar
            className={classes.picture}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <span
            style={{
              width: "100%",
              fontSize: 25,
              textAlign: "center",
              fontWeight: "bolder",
              wordWrap: "break-word"
          }}
          >
            {user.displayName || user.email}
          </span>
        </div>
        <div className={classes.watchList}>
          <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>watchList</span>
          {
            coins?.map((coin) => {
              let profit = coin.price_change_percentage_24h >= 0;
              return watchlist?.includes(coin.id) &&
              <div className={classes.coin}>
                <span>{coin.name}</span>
                <span style={{
                  display: "flex",
                  gap: 8
                  }}></span>
                  <span style={{ color: profit ? "green" : "red" }}>{profit && '+'}{coin.price_change_percentage_24h?.toFixed(2)}%</span>
                  <span className={classes.trash} onClick={() => removeFromWatchList(coin.id)}>
                    <FaTrash style={{color: "red"}} />
                  </span>
              </div>
            })
          }
        </div>
        <Button
          onClick={logout}
          variant="contained"
          style={{
            backgroundColor: "gold",
            marginTop: "20px",
            width: "100%",
          }}
        >
        logout
      </Button>
      </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)} style={{
            height: 38,
            width: 38,
            marginLeft: 15,
            cursor: "pointer",
            backgroundColor: "#eebc1d"
          }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default UserSidebar