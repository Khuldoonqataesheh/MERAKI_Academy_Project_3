import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="Navigation" >
      <Link to="/login">LOGIN</Link>
      <Link to="/register">REGISTER</Link>
    </div>
  );
}
