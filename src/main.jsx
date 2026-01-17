import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ADD THESE TWO LINES if you have the package installed
// import '@carbon/styles/css/styles.css';
// import '@carbon/styles/css/g100.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
