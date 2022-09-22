import React, { useState } from "react";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import { TIcon } from "./iconType";
import styled from "styled-components";

const CheckIcon = styled(RadioButtonUncheckedOutlinedIcon)`
  margin-left: 20px;
  cursor: pointer;
  && {
    font-size: ${({ theme }) => theme.sizes.medium};
    path {
      fill: ${({ theme }) => theme.color.unCheckedIcon};
    }
  }
  &&:active,
  &&:hover {
    background: transparent;
  }
`;

const CheckedIcon = styled(RadioButtonCheckedOutlinedIcon)`
  margin-left: 20px;
  cursor: pointer;
  && {
    font-size: ${({ theme }) => theme.sizes.medium};
    path {
      fill: ${({ theme }) => theme.color.unCheckedIcon};
    }
    circle {
      fill: ${({ theme }) => theme.color.checkedIcon};
    }
  }
  &&:active,
  &&:hover {
    background: transparent;
  }
`;

export const Check: React.VFC<TIcon & { defVal?: boolean, isChecked?:boolean, onClick: () => void }> = ({
  onClick,
  defVal = false,
  isChecked
}) => {
  const [isCheckedTest, toggleCheck] = useState(isChecked || false);
  const onCheck = () => {
    toggleCheck(!isCheckedTest);
     onClick()
  }
  return (
    <>
      {isCheckedTest ? (
        <CheckedIcon onClick={onCheck} />
      ) : (
        <CheckIcon onClick={onCheck} />
      )}
    </>
  );
};
