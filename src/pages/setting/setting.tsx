import { Box, TextField as TextFieldImport } from "@mui/material";
import React, { useContext, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { Button } from "../../components/button/button";
import { Header } from "../../components/header/header";
import { ColorNames, ThemeColors } from "../../types";

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
  const styleContext = useContext(ThemeContext);
  const { color: GlobalColors, changeColor } = styleContext;
  const [newColors, setNewColor] = useState<ThemeColors>(GlobalColors);


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
            {Object.entries(newColors).map((colorItem) => {
              const [colorName, hexCode] = colorItem as [ColorNames, string];
              return (
                <Box key={colorName} display="flex" alignItems="center" component="li" mb={2}>
                  <TextField
                    id="standard-textarea"
                    label={colorName}
                    value={hexCode}
                    size="small"
                    onChange={(e) =>  setNewColor({...newColors, [colorName]: e.target.value})}
                    fullWidth
                  />
                  <Square color={hexCode} />
                </Box>
              );
            })}
          </ul>
        </form>
      </Box>
      <Button
        onClick={() => changeColor(newColors)}
      >
        SAVE
      </Button>
    </Box>
  );
};
