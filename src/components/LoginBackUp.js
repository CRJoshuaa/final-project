import React from "react";
import "./LoginBackUp.css";
// import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import logo from "../images/appLogoSquare.png";
import RedditIcon from "@mui/icons-material/Reddit";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function LoginBackUp() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login-header">
        <a
          className="social-icon"
          href="https://www.linkedin.com/showcase/besquarebyderiv/"
        >
          <LinkedInIcon />
        </a>
        <a href="https://twitter.com/BeSquareByDeriv" className="social-icon">
          <TwitterIcon />
        </a>
        <a
          href="https://www.reddit.com/user/Deriv_official/"
          className="social-icon"
        >
          <RedditIcon />
        </a>
      </div>
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
