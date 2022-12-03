import React from 'react'
import { CryptoState } from '../CryptoContext'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Avatar } from '@mui/material';
import { makeStyles } from 'tss-react/mui';


function  UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user } = CryptoState();
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

  const useStyles = makeStyles()(() => ({
    container: {
      width: 350,
      padding: 25,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "monospace",
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
    }
  }))

  const { classes } = useStyles();

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