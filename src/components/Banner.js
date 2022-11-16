import { makeStyles } from 'tss-react/mui'
import React from 'react'
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

function Banner() {
  const useStyles = makeStyles()(() => ({
    banner: {
      backgroundImage: "url(./cryptoHunter1.jpg)", 
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    bannerContent: {
      height: 450,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-between"
    },
    bannerTagline: {
      display: "flex",
      height: "50%",
      flexDirection: "column",
      alignContent: "center",
      textAlign: "center"
    }
  })) 

  const { classes } = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.bannerTagline}>
          <Typography
            variant='h2'
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat"
            }}
          >
            Crypto Watchman
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              colo: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat"
            }}
          >
            For all your favorite crypocurrency information. 
          </Typography>
        </div>
      </Container>
    </div>
  )
}

export default Banner