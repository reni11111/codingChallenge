import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '70%',
    backgroundColor: '#434343',
    borderRadius: 0,
    height: 64
  },
  input: {
    marginLeft: theme.spacing(3),
    color: 'white',
    flex: 1,
    fontSize: 24
  },
  iconButton: {
    backgroundColor: '#F1C24A',
    borderRadius: 0,
    color: '#000000',
    '&:hover': {
      backgroundColor: '#F1C24A',
    },
    width: 64,
    height: 64
  },
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
            <CircularProgress value={64} />
            :
            <SearchIcon/>
        }
      </IconButton>

    </Paper>
  )
}
