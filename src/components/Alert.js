import React from 'react'
import { CryptoState } from '../CryptoContext';
import Snackbar from '@mui/material/Snackbar';

const Alert = () => {

  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setAlert({
      open: false,
      message: "",
      type: ""
    })
  }

  return (
  <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
      {alert.message}
    </Alert>
  </Snackbar>
  )
}

export default Alert