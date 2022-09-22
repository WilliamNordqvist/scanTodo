import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStore } from "../hooks/types";
import { useRecipe } from "../hooks/useRecipe";
import { useStyles } from "../hooks/useStyles";

const intState: GlobalStore = {
  recipes:{
    favRecipes:[],
    addFavRecipe:() => {},
    deleteFavRec:() => {},
    isRecAlreadyAdded:() => false,
  }
};

const GlobalContext: React.Context<GlobalStore> = createContext(intState);

export const StoreProvider: React.FC = ({ children }) => {
  const recipes = useRecipe();
  const {theme, changeColor} = useStyles()

  return (
    <GlobalContext.Provider
      value={{
        recipes
      }}
    >
      <ThemeProvider
        theme={{
          ...theme,
          changeColor
        }}
      >
        {children}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(GlobalContext);
  return store;
};
