import React from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";

function Sidebar() {
  return (
    <div className="sidebar-cont">
      <div className="sidebar-header">
        <div className="sidebar-info">
          <h2> Slackerz </h2>
          <h3>
            <FiberManualRecordIcon />
            Nobita
          </h3>
        </div>
        <CreateIcon />
      </div>
    </div>
  );
}

export default Sidebar;
