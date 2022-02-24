import React, { useEffect, useState, Component } from "react";
import "./Settings.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { EditText, EditTextarea } from "react-edit-text";
import SettingsSideBar from "./SettingsSideBar";
import SettingsIcon from "@mui/icons-material/Settings";
import Modal from "react-modal";
import "./SettingsSideBar.css";

function Settings() {
  const [user] = useAuthState(auth);
  function textEdit() {
    return <EditText defaultValue={user?.displayName} />;
  }
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
      <SettingsSideBar Icon={SettingsIcon} title="Account" />
      <SettingsSideBar Icon={SettingsIcon} title="Account" />
      <SettingsSideBar Icon={SettingsIcon} title="Account" />
      <SettingsSideBar Icon={SettingsIcon} title="Account" />

      <img
        className="header-avatar"
        onClick={() => auth.signOut}
        alt={user?.displayName}
        src={user?.photoURL}
      />
      <button onClick={() => setModalProfilePictureIsOpen(true)}>
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
      <div>{user?.displayName}</div>
      <button onClick={() => setModalNameIsOpen(true)}>
        Edit profile name
      </button>
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
    </div>
  );
}

export default Settings;
