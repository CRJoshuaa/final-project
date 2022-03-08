import React from "react";
import "./Settings.css";
// import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
// import ColorLensSharpIcon from "@mui/icons-material/ColorLensSharp";
// import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
// import HelpOutlineSharpIcon from "@mui/icons-material/HelpOutlineSharp";
import "./SettingsSideBar.css";
// import SettingsSideBar from "./SettingsSideBar";
import AccountSetting from "./Account_setting";
import AppearanceSetting from "./Appearance_setting";
// import MessageNotifications from "./Notifications";

function Settings() {
  return (
    <div className="settings-cont">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>
      {/* <div>
        <SettingsSideBar Icon={PermIdentitySharpIcon} title="Account" />
        <SettingsSideBar Icon={ColorLensSharpIcon} title="Appearance" />
        <SettingsSideBar
          Icon={NotificationsNoneSharpIcon}
          title="Notifications"
        />
        <SettingsSideBar Icon={HelpOutlineSharpIcon} title="Help" />
      </div> */}
      <AccountSetting />

      <AppearanceSetting />

      {/* <div>
        <MessageNotifications />
      </div> */}
    </div>
  );
}

export default Settings;
