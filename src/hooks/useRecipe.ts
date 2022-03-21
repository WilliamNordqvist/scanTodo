import { ref, set, remove ,onValue} from "firebase/database";
import { useEffect, useState } from "react";
import database from "../db/config";
import { TFavRec } from "../types";
import { TGlobalRecipe, DB_TYPES } from "./types";


export const useRecipe = ():TGlobalRecipe => {
    const [favRecipes, setFavRecipes] = useState<TFavRec[] | undefined>([]);
    
    useEffect(() => {
        const itemsRef = ref(database,DB_TYPES.RECIPES);

        onValue(itemsRef, (snapshot:any) => {
            const res: TFavRec[] = snapshot.val()
            const convertObjToArr = Object.values(res || [])
            setFavRecipes(convertObjToArr)
        })
    }, [])

    const isRecAlreadyAdded = (recipeId:string) => {
        const allRecIds = new Set(favRecipes?.map(rec => rec.id))
        return allRecIds.has(recipeId)
    }

    const addFavRecipe = (recipe:TFavRec) => {
        if(isRecAlreadyAdded(recipe.id)){
            remove(ref(database, `${DB_TYPES.RECIPES}/${recipe.id}`))
            return null
        }
        set(ref(database,`${DB_TYPES.RECIPES}/${recipe.id}`),recipe)
    }

    const deleteFavRec = (deleteArr:TFavRec[]) => {
        deleteArr.forEach(favRec => {
            remove(ref(database, `${DB_TYPES.RECIPES}/${favRec.id}`))
        })
    }

    return {
        favRecipes,
        addFavRecipe,
        deleteFavRec,
        isRecAlreadyAdded,
    }
}
