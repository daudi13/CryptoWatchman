import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { CryptoState } from '../CryptoContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


function SignUp({handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAlert } = CryptoState();
  
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Your passwords do not match please try again",
        type: "error"
      })
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      const user = userCredential.user
      console.log(user);
      setAlert({
        open: true,
        message: `Sign up successful. welcone ${user.email}`,
        type: "success"
      })
        handleClose();
      })
      .catch((error) => {
      setAlert({
        open: true,
        message: `${error.message}`,
        type: "error"
      })
        handleClose();
    })
  };
  return (
    <Box p={3} style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      <TextField
        variant='outlined'
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        variant='outlined'
        type="password"
        label="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        type="submit"
        size="large"
        style={{ padding: 10, backgroundColor: "gold", }}
        fullWidth
        onClick={handleSubmit}
      >
        Sign up
      </Button>
    </Box>
  )
}

export default SignUp