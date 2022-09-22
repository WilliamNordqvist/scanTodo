import { TFavRec, Theme, ThemeColors } from "../types";


  export type TGlobalRecipe = {
    favRecipes?:TFavRec[]
    addFavRecipe:(recipe:TFavRec) => void;
    deleteFavRec:(deleteArr:TFavRec[]) => void;
    isRecAlreadyAdded:(recipe:string) => boolean;
  }

  export type TGlobalStyles = {
    theme:Theme,
    changeColor:(newColors:ThemeColors) => void;
  }

  export type GlobalStore = {
    recipes: TGlobalRecipe,
  };

export enum DB_TYPES {
  ALL_LISTS = 'allLists',
  ITEMS = 'items',
  RECIPES = 'recipes',
  THEME = 'theme'
}
