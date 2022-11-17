import { AppBar, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { CryptoState } from '../CryptoContext';

const Header = () => {
  const useStyles = makeStyles()(() => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    }
  }))

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  });

  const { classes } = useStyles();
  const navigate = useNavigate()
  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography className={classes.title} onClick={() => navigate("/")}>Crypto Watchman</Typography>
            <Select variant='outlined' style={
              {
                width: 100,
                height: 40,
                marginLeft: 15,
                color: "white",
              }
            }
            value={ currency }
            onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'usd'}>USD</MenuItem>
              <MenuItem value={'aud'}>AUD</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header