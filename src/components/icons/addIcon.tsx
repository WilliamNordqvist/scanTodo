import React from "react";
import { TIcon } from "./iconType";
import { Add as AddIconMUI } from "@mui/icons-material";
import styled from "styled-components";

const StyledAddIcon = styled(AddIconMUI)`
margin-left:20px;
cursor:pointer;
&& {
    font-size:35px;
    fill:${({theme}) => theme.color.plusIcon};
}
`;

export const AddIcon: React.VFC<TIcon> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <StyledAddIcon fontSize="medium" />
    </div>
  );
};
