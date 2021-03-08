import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import './index.css'
import Home from './Home.jsx'

const theme = createMuiTheme({
  typography: {
    'fontFamily': 'Open Sans',
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
