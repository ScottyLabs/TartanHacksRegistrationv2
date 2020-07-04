import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Create, View, Team } from "./pages/team"
import Application from './pages/Application'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/team/create">
          <Create />
        </Route>
        <Route path="/team/:id">
          <View />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
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
