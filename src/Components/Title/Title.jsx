import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import colors from './../../assets/Colors'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 48,
    marginBottom: 30,
    color: colors.yellow,
    fontSize: 64,
    fontWeight: 'bold',
    [theme.breakpoints.down('lg')]: {
      marginTop: 32,
      fontSize: 48,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 24,
      marginBottom: 24,
      fontSize: 32,
    },
  }
}))
export default function Title() {
  const classes = useStyles()

  return (
    <div className={classes.title}>Image Engine</div>
  )
}
