import React from "react";
import { PhotoCamera } from "@mui/icons-material/";
import { TIcon } from "./iconType";
import styled from "styled-components";

const StyledCameraIcon = styled(PhotoCamera)`
  margin-left: 20px;
  cursor: pointer;
  && {
    font-size: 35px;
    path, circle {
      fill: ${({ theme }) => theme.color.cameraIcon};
    }
  }
`;

export const CameraIcon: React.VFC<TIcon> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <StyledCameraIcon fontSize="medium" />
    </div>
  );
};
