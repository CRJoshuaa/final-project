import React, { useContext, useState } from "react";
import "./Settings.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { ThemeContext } from "./ThemeContext";

// import SettingsSideBar from "./SettingsSideBar";
import Modal from "react-modal";
import "./Apperance_setting.css";
import { toast } from "react-toastify";

toast.configure();

// import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
// import ColorLensSharpIcon from "@mui/icons-material/ColorLensSharp";
// import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
// import HelpOutlineSharpIcon from "@mui/icons-material/HelpOutlineSharp";

function AccountSetting() {
  const [user] = useAuthState(auth);

  const [imageURL, setImageURL] = useState("");
  const [modalProfilePictureIsOpen, setModalProfilePictureIsOpen] =
    useState(false);
  const [modalNameIsOpen, setModalNameIsOpen] = useState(false);
  const [name, setName] = useState("");

  /*adding light/dark mode start*/

  const theme = useContext(ThemeContext);

  const darkMode = theme.state.darkMode;

  /*adding light/dark mode end*/

  async function uploadPhotoToFirebase() {
    //Profile picture URL string check
    if (!imageURL) {
      toast.error("New profile picture URL cannot be empty");
    } else {
      await updateProfile(user, {
        photoURL: imageURL,
      })
        .then(() => {
          toast.success("Profile picture successfully updated!");
        })
        .catch((error) => {
          console.log(error);
        });

      setTimeout(window.location.reload(), 10000);
    }
  }

  async function uploadNewNametoFirebase() {
    //Username string check
    let symbolsRegex = new RegExp(/^[a-zA-Z0-9_\s]*$/gm);
    let startingNumRegex = new RegExp(/^[0-9]/g);
    let startingWhitespaceRegex = new RegExp(/^[\s]/g);

    if (!name) {
      toast.error("New profile name cannot be empty");
    } else if (startingNumRegex.test(name)) {
      toast.error("New profile name cannot start with number");
    } else if (startingWhitespaceRegex.test(name)) {
      toast.error("New profile name cannot start with white space");
    } else if (!symbolsRegex.test(name)) {
      toast.error("New profile name cannot have symbols");
    } else if (name.length > 25) {
      toast.error("New profile name cannot have more than 25 characters");
    } else if (name.length < 3) {
      toast.error("New profile name cannot have less than 3 characters");
    } else {
      await updateProfile(user, {
        displayName: name,
      })
        .then(() => {
          toast.success("Username successfully updated!");
        })
        .catch((error) => {
          console.log(error);
        });
      setTimeout(window.location.reload(), 10000);
    }
  }

  return (
    <div
      className={`account-cont ${
        darkMode ? "background-dark" : "background-light"
      }`}
    >
      <div className="account-header">
        <h2>Account</h2>
      </div>
      <div className="account-setting">
        <div className="profile-picture">
          <div className="pfp-title">
            <h3>Profile Picture</h3>
          </div>
          <img
            className="header-avatar"
            onClick={() => auth.signOut}
            alt={user?.displayName}
            src={user?.photoURL}
          />
          <button
            className={`btn ${darkMode ? "btn-dark" : "btn-light"}`}
            onClick={() => setModalProfilePictureIsOpen(true)}
          >
            Edit profile picture
          </button>
          <Modal
            isOpen={modalProfilePictureIsOpen}
            className={`pop-up ${darkMode ? "pop-up-dark" : "pop-up"}`}
          >
            <div className="input">
              <input
                type="url"
                name="url"
                placeholder="https://example.com"
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>
            <div
              className={`pop-up-btn ${
                darkMode ? "pop-up-btn-dark" : "pop-up-btn"
              }`}
            >
              <button onClick={uploadPhotoToFirebase}>Upload</button>
              <button onClick={() => setModalProfilePictureIsOpen(false)}>
                Cancel
              </button>
            </div>
          </Modal>
        </div>

        <div className="general-info">
          <h3>General Info</h3>
          <div className="un-deets">Username:</div>
          <div className="username">
            <div
              className={`current-un ${
                darkMode ? "current-un-dark" : "current-un"
              }`}
            >
              {user?.displayName}
            </div>
            <button
              className={`btn ${darkMode ? "btn-dark" : "btn-light"}`}
              onClick={() => setModalNameIsOpen(true)}
            >
              Edit profile name
            </button>
          </div>
          <br />

          <Modal isOpen={modalNameIsOpen} className="pop-up">
            <div className="input">
              <input
                type="text"
                placeholder="Enter new profile name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="pop-up-btn">
              <button onClick={uploadNewNametoFirebase}>Upload</button>
              <button
                onClick={() => {
                  setName("");
                  setModalNameIsOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </Modal>

          <div className="email">
            <div className="email-deets">Email:</div>
            <div
              className={`current-email ${
                darkMode ? "current-email-dark" : "current-email"
              }`}
            >
              {" "}
              {user?.email}
            </div>
          </div>
          <button
            className={`btn ${darkMode ? "btn-dark" : "btn-light"}`}
            onClick={() => auth.signOut()}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;
