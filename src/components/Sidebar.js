import React, { useContext } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsIcon from "@mui/icons-material/Settings";
import { ThemeContext } from "./ThemeContext";
// import "./Apperance_setting.css";
// import CreateIcon from "@mui/icons-material/Create";

import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";
import {
  Add,
  // ExpandLess,
  // ExpandMore,
  Newspaper,
  MonetizationOn,
  Home,
  // Chat,
} from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Sidebar() {
  const history = useHistory();
  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;

  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);

  return (
    <div
      className={`sidebar-cont ${
        darkMode ? "sidebar-cont-dark" : "sidebar-cont-dark"
      }`}
    >
      <div
        className={`sidebar-header ${
          darkMode ? "sidebar-header-dark" : "sidebar-header-dark"
        }`}
      >
        <div className="sidebar-left">
          <img
            className="sidebar-avatar"
            onClick={() => {
              history.push("settings");
            }}
            alt={user?.displayName}
            src={user?.photoURL}
          />
          {/* <AccessTimeIcon /> */}
        </div>
        <div className="sidebar-info">
          <h2> Coingram </h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <IconButton
          onClick={() => {
            history.push("settings");
          }}
        >
          <SettingsIcon />
        </IconButton>
        {/* <SidebarOption Icon={Settings} title="">
        </SidebarOption> */}
      </div>
      {/* <SidebarOption Icon={Settings} title="Settings" /> */}
      <div className="sidebar-crypto">
        <SidebarOption Icon={Home} title="Crypto Home" />
        <SidebarOption Icon={MonetizationOn} title="Cryptocurrencies" />
        <SidebarOption Icon={Newspaper} title="Crypto News" />
      </div>
      <hr />
      <div className="sidebar-misc">
        {/* <SidebarOption Icon={ExpandLess} title="Show less" /> */}

        {/* TODO: implement direct messages */}
        {/* <SidebarOption Icon={Chat} DirectMessage title="Direct Message" /> */}
        {/* <Link to="/DirectMessage"> Direct Message </Link> */}
      </div>
      <SidebarOption Icon={Add} addChannelOption title="Channels" />
      <div className="sidebar-channel">
        {channels?.docs.map((doc) => (
          <Link
            key={doc.id}
            to="/"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <SidebarOption id={doc.id} title={doc.data().name} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
