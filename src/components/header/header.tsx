import React from "react";
import styled from "styled-components";

type THeader = {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "hero" | "sub";
  noMargin?: boolean;
};

const H2 = styled.h2<{ noMargin: boolean | undefined }>`
  text-align: center;
  text-transform: uppercase;
  margin: ${({ noMargin, theme }) => (noMargin ? "0" : theme.sizes.small)};
  color:${({theme }) => theme.color.primaryTextColor};

`;
const H1 = styled.h1`
  text-align: center;
  text-transform: uppercase;
`;

export const Header: React.FC<THeader> = ({
  children,
  as = "h1",
  noMargin,
}) => {
  if (as === "h2") return <H2 noMargin={noMargin}>{children}</H2>;

  return <H1>{children}</H1>;
};
