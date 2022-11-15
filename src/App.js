import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import Coin from './Pages/Coin';
import { makeStyles } from 'tss-react/mui';

function App() {
  const useStyles = makeStyles()(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    }
  }))

  const {classes} = useStyles()
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Homepage/>} exact />
            <Route path='/coin/:id' element={<Coin/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
