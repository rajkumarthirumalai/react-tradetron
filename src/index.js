
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeParse } from '@parse/react';

// initializeParse(
//   'https://rajkumar-react-app.b4a.io/',
//   'Otg6dhouituAnq47CWohLWHJS3b7i9RlGBqAebZA',
//   'Qjnl5lvN22B5aWpxLfAgi09RXHHN1sxgSJI2Y1K5'
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
