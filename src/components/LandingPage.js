import React from "react";
import "./LandingPage.css";
import logo from "../images/appLogoSquare.png";

function LandingPage({ user }) {
  return (
    <div className="landing-page">
      <div className="greeting">
        <h1>Hello</h1>
        <h1> {user?.displayName}</h1>
      </div>
      <img src={logo} alt="henlo" />
      <h3>Get started on your crypto journey today!</h3>
    </div>
  );
}

export default LandingPage;
