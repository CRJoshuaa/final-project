import React from "react";
import "./Login.css";
// import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="container">
      <section>
        <div className="left">
          <img
            src="https://www.arkasoftwares.com/blog/wp-content/uploads/2021/10/chatting-and-video-calling-app-development-e1634044819382.png"
            alt="pic"
            // class="rotateRight"
          />
        </div>

        <div className="right">
          <div className="form">
            <div className="name">
              <div className="box">
                <h1>COINGRAM.</h1>
              </div>
            </div>
            <h2>" Experience a totally new way to communicate! "</h2>
            <button onClick={signIn} type="button" className="bttn">
              <span className="bttnIcon">
                <FcGoogle />
              </span>
              <span className="bttnText"> Sign In With Google</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
