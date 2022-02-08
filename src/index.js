import React from 'react';
import ReactDOM from 'react-dom';
import CssT from './CssT';
import E from './E';
// import Hover from './Hover';
import './index.css';
// import PopoverExampleMulti from './Pop';
// import Navi from './Navbar';/
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Roti from './Router';
import App from './Router2';
// import Roti from './Router'
// import Tugas from './Tugas';

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
