import React from "react";
import styled from "styled-components";
import { Paper as paperMUI } from "@mui/material";

const Wrapper = styled.div`
  height: 100%;
  padding: ${({ theme }) => theme.sizes.small};
  overflow-y: hidden;
  padding: ${({ theme }) => theme.sizes.normal};
  @media only screen and (${({ theme }) => theme.device.mobile}) {
    padding: ${({ theme }) => theme.sizes.xsmall};
  }
`;

const Paper = styled(paperMUI)`
  box-sizing: border-box;
  height: 100%;
  max-width: ${({ theme }) => theme.width.large};
  margin: 0 auto;
  padding: ${({ theme }) => theme.sizes.small};
  position:relative;
  && {
    background: ${({ theme }) => theme.color.secondaryBackground};
  }
`;

export const MainCard: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Paper elevation={24}>{children}</Paper>
    </Wrapper>
  );
};
