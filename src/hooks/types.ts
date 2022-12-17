import { ColorNames, Theme } from "../types";

  export type TGlobalStyles = {
    theme:Theme,
    changeColor:(newColors:{name:ColorNames, newColor:string}[]) => void;
  }  

export enum DB_TYPES {
  ALL_LISTS = 'allLists',
  ITEMS = 'items',
  RECIPES = 'recipes',
  THEME = 'theme'
}
