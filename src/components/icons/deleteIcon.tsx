import React from "react";
import { TIcon } from "./iconType";
import styled from "styled-components";
import { Delete as DeleteMUI } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const Delete = styled(DeleteMUI)`
  && {
    fill: ${({ theme }) => theme.color.trashIcon};
    font-size: 30px;
  }
`;

export const DeleteIcon: React.VFC<TIcon> = ({ onClick }) => {
  return (
    <IconButton sx={{padding:'0'}} onClick={onClick}>
      <Delete fontSize="medium" />
    </IconButton>
  );
};
