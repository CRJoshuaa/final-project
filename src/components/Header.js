import React from "react";
import "./Header.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <div className="header">
      {/* Header Left */}
      <div className="header-left">
        <img
          className="header-avatar"
          onClick={() => auth.signOut()}
          alt={user?.displayName}
          src={user?.photoURL}
          //TODO: Add onclick
        />
        <AccessTimeIcon />
      </div>

      {/* Header Search */}
      <div className="header-search">
        <SearchIcon />
        <input placeholder="Search!"></input>
      </div>

      {/* Header Right */}
      <div className="header-right">
        <HelpOutlineIcon />
      </div>
    </div>
  );
}

export default Header;
