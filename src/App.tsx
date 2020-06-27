import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Create, View, Team } from "./pages/team"

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
