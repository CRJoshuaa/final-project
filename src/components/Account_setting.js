import React, { useState } from "react";
import "./Settings.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import SettingsSideBar from "./SettingsSideBar";
import Modal from "react-modal";
import "./Settings.css";
import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";
import ColorLensSharpIcon from "@mui/icons-material/ColorLensSharp";
import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
import HelpOutlineSharpIcon from "@mui/icons-material/HelpOutlineSharp";

function AccountSetting() {
  const [user] = useAuthState(auth);
  // function textEdit() {
  //   return <EditText defaultValue={user?.displayName} />;
  // }
  const [imageURL, setImageURL] = useState("");
  const [modalProfilePictureIsOpen, setModalProfilePictureIsOpen] =
    useState(false);
  const [modalNameIsOpen, setModalNameIsOpen] = useState(false);
  const [name, setName] = useState("");

  function uploadPhotoToFirebase() {
    updateProfile(user, {
      photoURL: imageURL,
    })
      .then(() => {
        console.log(imageURL);
        console.log("Profile updated picture!!!");
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  }

  function uploadNewNametoFirebase() {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log(imageURL);
        console.log("Profile updated name!!!");
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
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
        Uid:
        <br />
        <div> {user?.uid}</div>
        Don't ever share this with your friends.
      </div>
      <br />
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
