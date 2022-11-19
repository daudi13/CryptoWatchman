import React from 'react'
import { useParams } from 'react-router-dom'

const Coin = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div style={{color: 'white'}}>Coin</div>
  )
}

export default Coin