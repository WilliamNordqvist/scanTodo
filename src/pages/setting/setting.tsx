import { Box, TextField as TextFieldImport } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../components/button/button";
import { Header } from "../../components/header/header";
import { useStyles } from "../../hooks/useStyles";
import { ColorNames } from "../../types";

const TextField = styled(TextFieldImport)`
  text-transform: capitalize;
  fieldset {
    border-color: white !important;
  }
  * {
    color: white !important;
  }
`;


const Square = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  width: ${({ theme }) => theme.sizes.medium};
  height: ${({ theme }) => theme.sizes.medium};
  border: 1px solid white;
  margin-left: ${({ theme }) => theme.sizes.medium};
  border-radius: 2px;
`;

export const Setting: React.VFC = () => {
  // const { theme: {color: GlobalColors }}  = useThemes();
  const { theme, changeColor } = useStyles();

  const settingColors = Object.entries(theme.color).map((e) => ({
    name: e[0],
    color: e[1],
    hasChanged: false,
  }));
  const [colors, setColors] = useState(settingColors);
  
  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box height="auto" overflow="scroll" mb={1}>
        <Header as="h2">Settings</Header>
        <form>
          <ul>
            {colors.map(({ name, color }, i) => {
              return (
                <Box
                  key={name}
                  display="flex"
                  alignItems="center"
                  component="li"
                  mb={2}
                >
                  <TextField
                    id="standard-textarea"
                    label={name}
                    value={color}
                    size="small"
                    onChange={(e) => {
                      colors[i].color = e.target.value.trim();
                      colors[i].hasChanged = true;
                      setColors([...colors]);
                    }}
                    fullWidth
                  />
                  <Square color={color} />
                </Box>
              );
            })}
          </ul>
        </form>
      </Box>
      <Button
        onClick={() => {
          const changed = colors
            .filter((i) => i.hasChanged)
            .map(({ name, color }) => ({
              name: name as ColorNames,
              newColor: color,
            }));
          changeColor(changed);
        }}
      >
        SAVE
      </Button>
    </Box>
  );
};
