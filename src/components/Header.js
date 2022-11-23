import { AppBar, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider, Button } from '@mui/material'
import { Container } from '@mui/system'
import Modal from '@mui/material/Modal';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';
import Box from '@mui/material/Box';
import { CryptoState } from '../CryptoContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: "#fff",
  p: 4,
};

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
  const { currency, setCurrency, open, setOpen } = CryptoState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                style={{ backgroundColor: "gold" }}
                onClick={handleOpen}
              >
                Login
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </ThemeProvider>
  )
}

export default Header