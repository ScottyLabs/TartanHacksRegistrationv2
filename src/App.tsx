import React from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
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
      <Helmet>
        <title>TartanHacks Registration</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Register for TartanHacks" />
      </Helmet>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/verify/:token">
          <Verify />
        </Route>
        <Route path="/reset/:token">
          <ResetPassword />
        </Route>
        <Route path="/reset">
          <ResetEmail />
        </Route>
        <PrivateRoute path="/team/create">
          <Create />
        </PrivateRoute>
        <PrivateRoute path="/team/join">
          <Join />
        </PrivateRoute>
        <PrivateRoute path="/team/:id">
          <View />
        </PrivateRoute>
        <PrivateRoute path="/team">
          <Team />
        </PrivateRoute>
        <PrivateRoute path="/application">
          <Application />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
