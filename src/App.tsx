import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import Application from './components/Application'

function App() {
  return (
    <div className="App">
      
      <Switch>
        <Route path="/application">
          <Application email="richgtx@gmail.com"/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
