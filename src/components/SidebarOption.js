import React from "react";
import "./Sidebar.css";

function SidebarOption({ Icon, title, addChannelOption }) {
  const addChannel = () => {};
  const selectChannel = () => {};

  return (
    <div className="sidebar-option-cont">
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <div class="sidebar-option-channel">
          <span>#</span>
          {title}
        </div>
      )}
    </div>
  );
}

export default SidebarOption;
