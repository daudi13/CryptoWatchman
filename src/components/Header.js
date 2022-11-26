import { AppBar, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider, Button } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import { CryptoState } from '../CryptoContext';
import ModalBox from './ModalBox';


const Header = () => {
  const useStyles = makeStyles()(() => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
    right: {
      display: "flex",
      alignContent: "center",
      gap : 10
    },
  }))

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  });

  const { classes } = useStyles();
  const navigate = useNavigate()
  const { currency, setCurrency, setOpen, open } = CryptoState();
  const handleOpen = () => setOpen(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography className={classes.title} onClick={() => navigate("/")}>Crypto Watchman</Typography>
            <div className={classes.right}>
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
              <Button
                variant='contained'
                style={{
                  width: 85,
                  height: 40,
                  marginLeft: 15,
                  backgroundColor: "#EEBC1D",
                }}
                onClick={handleOpen}
              >
                Login
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <ModalBox open={open} setOpen={setOpen} />
    </ThemeProvider>
  )
}

export default Header