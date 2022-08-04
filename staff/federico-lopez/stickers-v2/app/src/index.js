import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { context } from './logic'
import { BrowserRouter } from 'react-router-dom'

context.API_URL = process.env.REACT_APP_API_URL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

context.API_URL = process.env.REACT_APP_API_URL

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
