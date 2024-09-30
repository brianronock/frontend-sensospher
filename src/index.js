/***********************************************************
    src/index.js
/********************************************************************************************************
Purpose:
The `index.js` file serves as the main entry point of the React application. It wraps the application with providers for `Redux` (global state management) and `React Router` (routing), and initializes rendering on the root DOM element.

#Key Features:
- React Strict Mode: Used to highlight potential issues during development by performing additional checks.
- Redux Provider: Wraps the application in a Redux `Provider` to allow global state management.
- React Router: Wraps the app with the `Router` to enable client-side navigation.
  
#Function Flow:
1. ReactDOM.render: Renders the `App` component into the root HTML element (`#root`).
2. Redux Provider: Provides global state management.
3. React Router: Wraps the app to handle client-side routing.
4. Performance Metrics: Optionally logs performance metrics using `reportWebVitals`.
********************************************************************************************************/

// Entry point for React app
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './redux/store' // Redux store import
import './index.css' // Global styles
import reportWebVitals from './reportWebVitals'

// Create root and render the app within the Redux provider and React Router
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
)
// Pass a function to reportWebVitals to log app performance metrics
reportWebVitals(console.log) // This logs performance metrics to the console