import React from "react";
import Spinner from "@mui/material/CircularProgress";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loading: React.VFC = () => {
  return (
    <Wrapper>
      <Spinner thickness={2} size={50} color="warning" />
    </Wrapper>
  );
};
