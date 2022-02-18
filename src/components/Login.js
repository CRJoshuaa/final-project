import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="Login-container">
      <div className="Login-inner-container">
        <img
          src="https://c.tenor.com/46lAWM-p0eYAAAAC/kermit-falling.gif"
          alt=""
        />
        <h1>Sign in to the KiasuChat</h1>
        <p>KiasuChat</p>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
