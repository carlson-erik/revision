import React from 'react';
import ReactDOM from 'react-dom';
/* -------- Components -------- */
import RTEditor from './editor';
/* -------- Global Styles -------- */
import './global.css';

const App = () => {
  return (
    <RTEditor readOnly={false} />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);