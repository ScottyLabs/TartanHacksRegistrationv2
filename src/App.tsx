import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import Application from './pages/Application'

function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route path="/application">
          <Application />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
