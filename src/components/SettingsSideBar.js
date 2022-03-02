import React from "react";

function SettingsSideBar({ Icon, title }) {
  return (
    <div className="settings-option-cont">
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <h3 className="settings-option-channel">
          <span>#</span>
          {title}
        </h3>
      )}
    </div>
  );
}

export default SettingsSideBar;
