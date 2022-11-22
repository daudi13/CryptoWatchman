import React from 'react'
import { makeStyles } from 'tss-react/mui'

const DayButtons = ({ selected, onClick, btn }) => {
  
  const useStyles = makeStyles()(() => ({
    button: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "transparent",
      color: selected ? "black" : "#fff",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black"
      }
    }
  }))

  const {classes} = useStyles()
  return (
    <button className={classes.button} onClick={onClick} selected={selected}>{btn.label}</button>
  )
}

export default DayButtons