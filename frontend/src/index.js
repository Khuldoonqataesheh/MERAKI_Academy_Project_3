import React from 'react';
// const React=require('react')
import ReactDOM from 'react-dom';
// import BrowserRouter and Route
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

