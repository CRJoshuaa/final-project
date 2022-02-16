import React from "react";
import "./Header.css";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
      {/* Header Right */}
    </div>
  );
}

export default Header;
