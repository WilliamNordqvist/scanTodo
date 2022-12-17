import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { useStyles } from "../hooks/useStyles";

export const ThemeProvider: React.FC = ({ children }) => {
  const { theme, changeColor } = useStyles();

  return (
    <StyledThemeProvider
      theme={{
        ...theme,
        changeColor,
      }}
    >
      {children}
    </StyledThemeProvider>
  );
};
