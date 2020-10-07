import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ca from './components/Ca.js';
import Cb from './components/Cb';
import CRouter from './components/CRouter';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <CRouter></CRouter>
      {/* <Ca></Ca>
      <Cb></Cb> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
