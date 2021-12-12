import { CssBaseline, ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import theme from './config/theme'
import * as serviceWorkerRegistration from './sw/serviceWorkerRegistration'

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
)

// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
