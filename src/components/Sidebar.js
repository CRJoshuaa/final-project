import React from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import SidebarOption from "./SidebarOption";
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
} from "@mui/icons-material";

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
      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & reactions" />
      <SidebarOption Icon={Drafts} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderOutlined} title="Channel browser" />
      <SidebarOption Icon={PeopleAlt} title="Peopl & user groups" />
      <SidebarOption Icon={Apps} title="Apps" />
      <SidebarOption Icon={FileCopy} title="File browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Channels" />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />
    </div>

    // <SidebarOption Icon={InsertCommentIocn} title="Threads"/>
  );
}

export default Sidebar;
