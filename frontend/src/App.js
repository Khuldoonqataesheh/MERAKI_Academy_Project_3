import React from "react";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
   
      <div className="App">
      <Navigation />
        <Route path="/register" render={() => <Register />} />
      </div>
    </>
  );
}
