import { useEffect, useState } from "react";
import database from "../db/config";
import { generateId } from "../utils/generateId";
import { ref, set, update, remove ,onValue} from "firebase/database";
import { TList, TListItem } from "../types";
import { TGlobalList, DB_TYPES } from "./types";

export const useList = ():TGlobalList => {
  const [allLists, setNewLists] = useState<TList[] | undefined>([]);

  useEffect(() => {
    const itemsRef = ref(database,DB_TYPES.ALL_LISTS);
    
    onValue(itemsRef, (snapshot:any) => {
      const res: TList[] = snapshot.val() || [];
        const convertObjToArr = Object.values(res).reverse()
        convertObjToArr.map(list => list.items = Object.values(list.items || [])) 
        setNewLists(convertObjToArr)
    });
  }, []);

  const createNewList = (listName: string, listId?:string ,listItems?:TListItem[]) => {
    const newList: TList = {
      name: listName,
      id:listId || generateId(),
      items: [],
    };
    const updatedList = [...allLists || [], newList];
    setNewLists(updatedList);
    set(ref(database,`${DB_TYPES.ALL_LISTS}/${newList.id}`),newList)

    if(listItems){
      listItems.forEach(item => set(ref(database,`${DB_TYPES.ALL_LISTS}/${newList.id}/${DB_TYPES.ITEMS}/${item.id}`),item))
    }
  };

  const createListItems = (listId:string, updatedArr:TListItem) => {
    set(ref(database,`${DB_TYPES.ALL_LISTS}/${listId}/${DB_TYPES.ITEMS}/${updatedArr.id}`),updatedArr)
  }

  const deleteList = (id: string) => {
    const newAllLists = allLists?.filter(list => list.id !== id )
    setNewLists(newAllLists)
    remove(ref(database,`${DB_TYPES.ALL_LISTS}/${Number(id)}`))
  };

  const checkListItem = (id:string, listItem:TListItem) => {
    const {isChecked, id:listItemId} = listItem
    update(ref(database, `${DB_TYPES.ALL_LISTS}/${id}/${DB_TYPES.ITEMS}/${listItemId}`),{isChecked:!isChecked})
  } 

  const deleteListItem = (id:string, itemsToDelete:TListItem[]) => {
    itemsToDelete.forEach(listItem => remove(ref(database, `${DB_TYPES.ALL_LISTS}/${id}/${DB_TYPES.ITEMS}/${listItem.id}`)))
    

  }

  return {
        allLists,
        createNewList,
        deleteList,
        createListItems,
        checkListItem,
        deleteListItem
      }
};
