import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'

import colors from './../../assets/Colors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '70%',
    backgroundColor: colors.grey,
    borderRadius: 0,
    height: 70,
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      height: 60
    },
  },
  input: {
    marginLeft: theme.spacing(3),
    color: colors.white,
    flex: 1,
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  iconButton: {
    backgroundColor: colors.yellow,
    borderRadius: 0,
    color: colors.black,
    '&:hover': {
      backgroundColor: colors.yellow,
    },
    width: 70,
    height: 70,
    [theme.breakpoints.down('sm')]: {
      width: 60,
      height: 60,
    },
  },
  searchIcon: {
    width: 45,
    height: 45,
    [theme.breakpoints.down('lg')]: {
      width: 40,
      height: 40,
    },
  }
}))

export default function Search(props) {
  const classes = useStyles()
  const { value, setValue, placeholder, onSearchClick, isLoading } = props

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        value={value}
        onChange={(event)=> {
          setValue(event.target.value)
        }}
        onKeyPress={(e) => { 
          // in case someone writes and clicks enter(studies on ux say people don't usually reach the button,
          // they just write the value and click enter)
          if (e.key === 'Enter'){
            e.preventDefault()
            onSearchClick()
          } 
        }}
      />

      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={onSearchClick}
      >
        {
          isLoading ?
            <CircularProgress value={70} />
            :
            <SearchIcon className={classes.searchIcon}/>
        }
      </IconButton>

    </Paper>
  )
}
