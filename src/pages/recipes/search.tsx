import React, { useState } from "react";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input/input";
import { Box } from "@mui/material";
import { Button } from "../../components/button/button";
import { useNavigate } from "react-router-dom";

export const Search: React.VFC = () => {
  const [inputValue, setInputValue] = useState<string>();

  const navigate = useNavigate();

  const redirectToRecipe = () => {
    if (!inputValue) {
      return null;
    }
    let id = inputValue.match(/\d+/);
    navigate(`${id}`);
  };

  return (
    <Box
      sx={{ height: "100%" }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Header as="h2">Add Ica Recipes</Header>
        <Input
          center
          value={inputValue || ""}
          setValue={setInputValue}
          onEnter={redirectToRecipe}
          placeholder="Add ica recipe url"
        />
      </Box>
      <Box sx={{ width: "50%", mx: "auto" }}>
        <Button onClick={redirectToRecipe}>
          Search
        </Button>
      </Box>
    </Box>
  );
};
