import React, { createContext, useContext } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStore } from "../hooks/types";
import { useList } from "../hooks/useList";
import { useRecipe } from "../hooks/useRecipe";
import { useStyles } from "../hooks/useStyles";

const intState: GlobalStore = {
  list: {
    allLists: [],
    createNewList: () => {},
    deleteList: () => {},
    createListItems: () => {},
    checkListItem: () => {},
    deleteListItem: () => {},
  },
  recipes:{
    favRecipes:[],
    addFavRecipe:() => {},
    deleteFavRec:() => {},
    isRecAlreadyAdded:() => false,
  }
};

const GlobalContext: React.Context<GlobalStore> = createContext(intState);

export const StoreProvider: React.FC = ({ children }) => {
  const list = useList();
  const recipes = useRecipe();
  const {theme, changeColor} = useStyles()

  return (
    <GlobalContext.Provider
      value={{
        list,
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
