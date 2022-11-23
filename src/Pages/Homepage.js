import React from 'react'
import Banner from '../components/Banner/Banner'
import CoinsTable from '../components/CoinsTable';
import { Helmet } from 'react-helmet';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8'/>
        <title>CryptoWatchMan | Welcome</title>
      </Helmet>
      <Banner />
      <CoinsTable/>
    </>
  )
}

export default Homepage;