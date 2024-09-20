// src/index.js
/**********************************************************
 * This is the main entry point of the React application.
 * React.StrictMode is used to help identify potential problems in an app by enabling additional checks and warnings.
 **********************************************************/

// Entry point for React app
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './redux/store'; // Redux store import
import './index.css'; // Global styles
import reportWebVitals from './reportWebVitals';

// Create root and render the app within the Redux provider and React Router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);
// Pass a function to reportWebVitals to log app performance metrics
reportWebVitals(console.log); // This logs performance metrics to the console