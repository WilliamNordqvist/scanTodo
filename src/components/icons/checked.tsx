import React from "react";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import { TIcon } from "./iconType";
import styled from "styled-components";

const CheckedIcon = styled(RadioButtonCheckedOutlinedIcon)`
  margin-left: 20px;
  cursor: pointer;
  && {
    font-size: ${({ theme }) => theme.sizes.medium};
    circle {
      fill: ${({ theme }) => theme.color.yellow};
    }
  }
  &&:active,
    &&:hover {
      background: transparent;
    }
`;

export const Checked: React.VFC<TIcon> = ({ onClick }) => {
  return <CheckedIcon onClick={onClick} />;
};
