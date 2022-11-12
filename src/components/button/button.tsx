import React from "react";
import { Button as MUIButton } from "@mui/material";
import styled, { css } from "styled-components";

type TButton = {
  onClick: () => void;
  buttontype?: "primary" | "secondary" | "delete";
  disabled?:boolean,
};

const StyledButton = styled(MUIButton)<{
  buttontype: "primary" | "secondary" | "delete";
}>`
  && {
    ${({ buttontype, theme }) =>
      buttontype === "primary" &&
      css`
        background: ${theme.color.primaryButtonColor};
        color: ${theme.color.primaryButtonTextColor};
        &:hover {
          background: ${theme.color.primaryButtonColor};
          color: ${theme.color.primaryButtonTextColor};
        }
      `}
    ${({ buttontype, theme }) =>
      buttontype === "secondary" &&
      css`
        background: ${theme.color.secondaryButtonColor};
        color: ${theme.color.secondaryButtonTextColor};
        &:hover {
          background: ${theme.color.secondaryButtonColor};
          color: ${theme.color.secondaryButtonTextColor};
        }
      `}
    ${({ buttontype, theme }) =>
      buttontype === "delete" &&
      css`
        background: ${theme.color.deleteButtonColor};
        color: ${theme.color.deleteButtonTextColor};
        &:hover {
          background: ${theme.color.deleteButtonColor};
          color: ${theme.color.deleteButtonTextColor};
        }
      `}
  }
`;

export const Button: React.FC<TButton> = ({
  children,
  onClick,
  buttontype = "primary",
  disabled = false,
}) => {
  return (
    <StyledButton
      buttontype={buttontype}
      onClick={onClick}
      fullWidth
      variant="contained"
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};
