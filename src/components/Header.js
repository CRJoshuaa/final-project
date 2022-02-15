import React from "react";
import "./Header.css";
import styled from "styled-components";

import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
function Header() {
  return (
    <div>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar
        //TODO: Add onclick
        />
        <AccessTimeIcon />
      </HeaderLeft>
      {/* Header Search */}
      {/* Header Right */}
    </div>
  );
}

export default Header;

const HeaderLeft = styled.div``;
const HeaderAvatar = styled(Avatar)``;
