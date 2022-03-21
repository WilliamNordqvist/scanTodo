import { TList, TListItem, TFavRec, Theme, ThemeColors } from "../types";

  export type TGlobalList = {
    allLists?: TList[];
    createNewList: (
      listName: string,
      listId?: string,
      listItems?: TListItem[]
    ) => void;
    deleteList: (id: string) => void;
    createListItems: (listId: string, updatedArr: TListItem) => void;
    checkListItem: (id: string, listItem: TListItem) => void;
    deleteListItem: (id: string, itemsToDelete: TListItem[]) => void;
  }

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
    list: TGlobalList
    recipes: TGlobalRecipe
  };

export enum DB_TYPES {
  ALL_LISTS = 'allLists',
  ITEMS = 'items',
  RECIPES = 'recipes',
  THEME = 'theme'
}
