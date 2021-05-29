import React, { useState } from "react";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import NewArticle from "./components/NewArticle";
import { Switch, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  const [token, setToken] = useState(undefined);
  return (
    <>
      <div className="App">
        <Navigation path="/" token={token} />
        <Switch>
          <Route path="/register" render={() => <Register />} />
          <Route path="/login" render={() => <Login token={setToken} />} />
          <Route path="/dashboard" render={() => <Dashboard />} />
          <Route path="/newArticle" render={() => <NewArticle token={token} />} />
        </Switch>
      </div>
    </>
  );
}
