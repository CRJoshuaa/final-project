import React from "react";
import "./LoginBackUp.css";
// import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import logo from "../images/appLogoSquare.png";

function LoginBackUp() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login-header"></div>
      <div className="login-body">
        <div className="login-left">
          <img
            src={logo}
            alt="pic"
            // class="rotateRight"
          />
        </div>
        <div className="login-right">
          <h1>COINGRAM.</h1>
          <h2>Talk and trade</h2>
          <button onClick={signIn} className="login-button">
            <div className="google-icon">
              <FcGoogle style={{ fontSize: "2rem" }} />
            </div>

            <p>Login With Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginBackUp;
