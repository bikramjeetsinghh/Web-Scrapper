import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import WebScrapperComponent from './components/WebScrapperComponent';

function App() {
  return (
    <div className="App" >
      <div className="row" style={{backgroundColor:"orange", padding: "20px"}}>
        <div className="col-12">
          <h3>Website Scrapper</h3>
        </div>
      </div>
      <WebScrapperComponent></WebScrapperComponent>
    </div>
  );
}
export default App;
