import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from '../config/api';
import { createTheme, ThemeProvider } from '@mui/system';
import { makeStyles } from 'tss-react/mui';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const CoinChart = ({coin}) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState()
  
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices)
  }

  console.log(historicalData)

  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  const useStyles = makeStyles()((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      }
    },
  }))
  
  const { classes } = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {
          !historicalData ? ("Loading...") : (
            <Line
              style={{height: "35vh"}}
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = date.getHours() > 12 ? `${date.getMinutes() - 12}: ${date.getMinutes()} PM` : `${date.getHours()}: ${date.getMinutes()} AM`

                  return days === 1 ? time : date.toLocaleDateString()
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Day${days > 1 ? "s" : ''}) in ${currency}`,
                    borderColor: "gold"
                  }
                ]
              }}
            />)
        }
        <div className={classes.buttons}>
          
        </div>
      </div>
    </ThemeProvider>
  )
}

export default CoinChart