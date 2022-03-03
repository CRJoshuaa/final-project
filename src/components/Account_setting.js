import React, { useState } from "react";
import "./Settings.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
// import SettingsSideBar from "./SettingsSideBar";
import Modal from "react-modal";
import "./Settings.css";
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

  async function uploadPhotoToFirebase() {
    await updateProfile(user, {
      photoURL: imageURL,
    })
      .then(() => {
        console.log(imageURL);
        console.log("Profile updated picture!!!");
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(window.location.reload(), 10000);
  }

  async function uploadNewNametoFirebase() {
    await updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log(imageURL);
        console.log("Profile updated name!!!");
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(window.location.reload(), 10000);
  }

  return (
    <div className="settings-cont">
      <h1>Account</h1>
      <div className="profile-picture">Profile Picture</div>

      <img
        className="header-avatar"
        onClick={() => auth.signOut}
        alt={user?.displayName}
        src={user?.photoURL}
      />
      <button
        className="modal-setting-1"
        onClick={() => setModalProfilePictureIsOpen(true)}
      >
        {" "}
        Edit profile picture
      </button>
      <Modal isOpen={modalProfilePictureIsOpen}>
        <div className="input">
          <input
            type="url"
            name="url"
            placeholder="https://example.com"
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <button onClick={uploadPhotoToFirebase}>Upload</button>
        <button onClick={() => setModalProfilePictureIsOpen(false)}>
          Cancel
        </button>
      </Modal>
      <div className="general-info">General Info</div>

      <div>
        Username:
        <br />
        {user?.displayName}
        <button onClick={() => setModalNameIsOpen(true)}>
          Edit profile name
        </button>
      </div>
      <br />

      <Modal isOpen={modalNameIsOpen}>
        <div className="input">
          <input
            type="text"
            placeholder="Your name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button onClick={uploadNewNametoFirebase}>Upload</button>
        <button onClick={() => setModalNameIsOpen(false)}>Cancel</button>
      </Modal>

      <div>
        Email:
        <br />
        <div> {user?.email}</div>
      </div>
      <br />
      <hr />
    </div>
  );
}

export default AccountSetting;
