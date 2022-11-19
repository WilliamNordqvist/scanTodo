import { Theme, ThemeColors } from "../types";

  export type TGlobalStyles = {
    theme:Theme,
    changeColor:(newColors:ThemeColors) => void;
  }  

export enum DB_TYPES {
  ALL_LISTS = 'allLists',
  ITEMS = 'items',
  RECIPES = 'recipes',
  THEME = 'theme'
}
