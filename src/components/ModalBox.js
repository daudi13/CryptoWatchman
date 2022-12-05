import React from 'react';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Login from './Login';
import SignUp from './SignUp';
import { makeStyles } from 'tss-react/mui';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { CryptoState } from '../CryptoContext';


const provider = new GoogleAuthProvider();


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: "#fff",
  borderRadius: 4
};



function ModalBox({ open, setOpen }) {
  const [value, setValue] = React.useState('1');

  const { setAlert } = CryptoState();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => setOpen(false);
  const useStyles = makeStyles()(() => ({
    google: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
      marginBottom: 30
    }
  }))

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        setAlert({
          open: true,
          message: `Sign in was successful. welcome ${user.displayName || user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: `${error.message}`,
          type: "error"
        });
        handleClose();
    })
  }

  const { classes } = useStyles();
  return (
  <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: 'grey', borderRadius: 3 }}>
            <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor='seconda' centered>
        <Tab label="Login" value="1" />
        <Tab label="Sign up" value="2"/>
      </Tabs>
        </Box>
          <TabPanel value="1"><Login handleClose={handleClose} /></TabPanel>
          <TabPanel value="2"><SignUp handleClose={handleClose} /></TabPanel>
          <Box className={classes.google}>
            <span>OR</span>
            <GoogleButton
              label='sign in with Google'
              onClick={signInWithGoogle}
              style={{width: "80%"}}
            />
          </Box>
      </TabContext>
      </Box>
  </Modal>
  )
}

export default ModalBox