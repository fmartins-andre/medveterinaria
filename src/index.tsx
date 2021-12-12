import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorkerRegistration from './sw/serviceWorkerRegistration'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)

// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
