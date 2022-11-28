import React from 'react';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Login from './Login';
import SignUp from './SignUp';



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
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => setOpen(false);
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
            <Tabs value={value} onChange={handleChange} textColor="seco" centered>
        <Tab label="Login" value="1" />
        <Tab label="Sign up" value="2"/>
      </Tabs>
        </Box>
        <TabPanel value="1"><Login/></TabPanel>
        <TabPanel value="2"><SignUp/></TabPanel>
      </TabContext>
      </Box>
  </Modal>
  )
}

export default ModalBox