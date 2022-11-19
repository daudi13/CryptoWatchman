import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { makeStyles } from 'tss-react/mui';
import { ThemeProvider, createTheme, Container, Typography, TextField, TableContainer, LinearProgress, Table, TableHead, TableRow, TableCell } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { numberWithCommas } from './Banner/Carousel';

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate()

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data);
    setLoading(false);
  }

  console.log(page)

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [currency])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })
  
  const handleSearch = () => coins.filter((coin) => (
    coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
  ))

  const useStyles = makeStyles()(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat"
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      }
    }
  }))

  const { classes } = useStyles()

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{margin: 18, fontFamily: "Montserrat"}}
        >
          Cryptocurrency Prices by Market cap
        </Typography>
        <TextField 
          id="outlined-basic"
          label="Search for a Crypto Currency"
          style={{marginBottom: 20, width: "100%"}}
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {
            loading ? <LinearProgress style={{ backgroundColor: "gold" }} /> : (
              <Table>
                <TableHead
                style={{backgroundColor: "gold"}}
                >
                  <TableRow>
                    {["Coin", "Price", "24h change", "Market cap"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat"
                        }}
                        key={head}
                        align={head === "coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                  </TableHead>
                  {
                    handleSearch().slice((page - 1) * 10, ((page - 1) * 10 )+ 10).map((row) => {
                      let profit = row?.price_change_percentage_24h >= 0

                      return (
                        <TableRow
                          onClick={() => navigate(`/coin/${row.id}`)}
                          className={classes.row}
                          key={row.id}
                        >
                          <TableCell component='th' scope='row' style={
                            {
                              display: "flex",
                              gap: 15,
                            }}>
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{marginBottom: 10}}
                            />
                            <div
                            style={{display: "flex", flexDirection: "column"}}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                                >
                                {row?.symbol}
                              </span>
                              <span style={{ color: "darkgrey" }}>{row?.name}</span>
                            </div>
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129" : "red",
                              fontWeight: 500,
                            }}
                            >
                            {symbol}
                            {numberWithCommas(row?.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129" : "red",
                              fontWeight: 500,
                            }}
                          >
                            <span>
                              <span style={{
                                color: profit > 0 ? "rgba(14, 203, 129" : "red",
                              }}>
                                {row?.price_change_percentage_24 > 0 && '+'}{row?.price_change_percentage_24h?.toFixed(2)}%
                              </span>
                            </span>
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {numberWithCommas(row?.market_cap.toString().slice(0, -6))}M
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
              </Table>
            )
          }
        </TableContainer>
        {
          coins.length &&
          <Pagination
          count={(+(handleSearch()?.length)/10).toFixed(2) || 0}
          variant="outlined"
          style={{
            padding: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450)
            }}
        />}
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable