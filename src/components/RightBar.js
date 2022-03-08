import React from "react";
import "./RightBar.css";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsPinAngle } from "react-icons/bs";
import { MdOutlinePermMedia } from "react-icons/md";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { AiOutlineLink } from "react-icons/ai";
import { IconButton } from "@mui/material";

function RightBar() {
  return (
    <div className="rightbar-cont">
      <div className="icons">
        <IconButton>
          <AiOutlineInfoCircle size={25} />
        </IconButton>
        <IconButton>
          <BsPinAngle size={25} />
        </IconButton>
        <IconButton>
          <MdOutlinePermMedia size={25} />
        </IconButton>
        <IconButton>
          <HiOutlineDocumentAdd size={25} />
        </IconButton>
        <IconButton>
          <AiOutlineLink size={25} />
        </IconButton>
      </div>
    </div>
  );
}

export default RightBar;
