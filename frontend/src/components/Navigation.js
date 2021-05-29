import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function Navigation({ token }) {
  return (
    <>
      {token ? (
        <div className="Navigation">
          <Link to="/dashboard">DASHBOARD</Link>
          <Link to="/newArticle">NEW ARTICLE</Link>
        </div>
      ) : (
        <div className="Navigation">
          <Link to="/login">LOGIN</Link>
          <Link to="/register">REGISTER</Link>
        </div>
      )}
    </>
  );
}
