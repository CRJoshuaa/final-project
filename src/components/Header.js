import React from "react";
import "./Header.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Button } from "@material-ui/core";
import Settings from "./Settings";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import App from "../App";

function Header() {
  const [user] = useAuthState(auth);

  const directToSettings = () => {
    return <Link to="/settings"></Link>;
  };
  return (
    <div className="header">
      {/* Header Left */}
      {/* <div className="header-left">
        <img
          className="header-avatar"
          onClick={() => auth.signOut()}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </div> */}

      {/* Header Search
      <div className="header-search">
        <SearchIcon />
        <input placeholder="Search!"></input>
      </div> */}

      {/* Header Right */}

      <div className="header-right">
        <HelpOutlineIcon />
      </div>
    </div>
  );
}

export default Header;
