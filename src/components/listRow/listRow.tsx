import React from "react";
import { Box, ListItem as ListItemMUI } from "@mui/material";
import styled, { css } from "styled-components";
import { Link as RouterLink, To } from "react-router-dom";

const Link = styled(RouterLink)`
  width: 100%;
  text-decoration: none;
`;

const StyledListRow = styled(ListItemMUI)<{
  type: "primary" | "secondary";
}>`
  &&,
  p {
    width: 97%;
    ${({ type, theme }) =>
      type === "primary" &&
      css`
        color: ${theme.color.primaryListRowText};
        background: ${theme.color.primaryListRow};
      `}
    ${({ type, theme }) =>
      type === "secondary" &&
      css`
        color: ${theme.color.secondaryListRowText};
        background: ${theme.color.secondaryListRow};
      `}
  }

  height: ${({ theme }) => theme.sizes.normal};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
`;

export const ListRow: React.FC<{
  icon: JSX.Element;
  type?: "primary" | "secondary";
}> = ({ children, icon, type = "primary" }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      pb={1}
    >
      <StyledListRow type={type}>
        {children}
      </StyledListRow>
      {icon}
    </Box>
  );
};
export const ListRowLink: React.FC<{
  to: To;
  icon: JSX.Element;
  type?: "primary" | "secondary";
}> = ({ children, icon,to, type = "primary" }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      pb={1}
    >
      <Link to={to}>
        <StyledListRow type={type}>
          {children}
        </StyledListRow>
      </Link>
      {icon}
    </Box>
  );
};
