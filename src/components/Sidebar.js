import React from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
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
  Newspaper,
  Timeline,
  MonetizationOn,
  Home,
  Chat,
} from "@mui/icons-material";
import { useAuthState } from "react-firebase-hooks/auth";

// import { Link } from "react-router-dom";
import CryptoNews from "./CryptoNews";
import { useNavigate } from "react-router-dom";
import { color } from "@mui/system";

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
        <CreateIcon />
      </div>
      <SidebarOption Icon={Home} title="Crypto Home" />
      <SidebarOption Icon={MonetizationOn} title="Cryptocurrencies" />
      <SidebarOption Icon={Timeline} title="Crypto Exchange" />
      <SidebarOption Icon={Newspaper} title="Crypto News" />
      {/* <SidebarOption Icon={BookmarkBorderOutlined} title="Channel browser" />
      <SidebarOption Icon={PeopleAlt} title="People & user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File browser" /> */}
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={Chat} DirectMessage title="Direct Message" />
      {/* <Link to="/DirectMessage"> Direct Message </Link> */}
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
