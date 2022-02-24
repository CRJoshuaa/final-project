import React from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import SettingsIcon from "@mui/icons-material/Settings";

import CreateIcon from "@mui/icons-material/Create";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";
import {
  Add,
  Apps,
  BookmarkBorderOutlined,
  Drafts,
  ExpandLess,
  ExpandMore,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
  Settings,
} from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  return (
    <div className="sidebar-cont">
      <div className="sidebar-header">
        <div className="sidebar-left">
          <img
            className="sidebar-avatar"
            onClick={() => auth.signOut()}
            alt={user?.displayName}
            src={user?.photoURL}
          />
          {/* <AccessTimeIcon /> */}
        </div>
        <div className="sidebar-info">
          <h2> Slackerz </h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <Link
          to="/settings"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <SettingsIcon />
        </Link>
        {/* <SidebarOption Icon={Settings} title="">
        </SidebarOption> */}
      </div>
      {/* <SidebarOption Icon={Settings} title="Settings" /> */}
      <SidebarOption Icon={Inbox} title="Mentions & reactions" />
      <SidebarOption Icon={Drafts} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderOutlined} title="Channel browser" />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />
      <div className="sidebar-channel">
        {channels?.docs.map((doc) => (
          <Link to="/" style={{ textDecoration: "inherit", color: "inherit" }}>
            <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
