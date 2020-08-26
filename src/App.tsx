import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Create, View, Team, Join } from "./pages/team";
import Application from "./pages/Application";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import { ResetEmail, ResetPassword } from "./pages/auth/Reset";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/verify/:token">
          <Verify />
        </Route>
        <Route path="/reset/:token">
          <ResetPassword />
        </Route>
        <Route path="/reset">
          <ResetEmail />
        </Route>
        <Route path="/team/create">
          <Create />
        </Route>
        <Route path="/team/join">
          <Join />
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
