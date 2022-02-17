import React from "react";
import "./Header.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function Header() {
  return (
    <div className="header">
      {/* Header Left */}
      <div className="header-left">
        <AccountCircleIcon
          className="header-avatar"
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
