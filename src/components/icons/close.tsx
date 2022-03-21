import React from "react";
import { Close } from "@mui/icons-material";
import { TIcon } from "./iconType";
import styled from "styled-components";

const StyledCloseIcon = styled(Close)`
  cursor: pointer;
  && {
    font-size: 35px;
    fill:black;
  }
`;

export const CloseIcon: React.VFC<TIcon> = ({ onClick }) => {
  return <StyledCloseIcon onClick={ onClick} fontSize="medium" />;
};
