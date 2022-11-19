import axios from "axios";
import { CacheData, RawTlist, RawTlistFull, TFavorites, TProduct, TRecipe, TRecipeResponse, URL_TYPES } from '../types'

const GOOGLE_SHEET = process.env.REACT_APP_URL as string

  const HTTP = <T>(url:string): Promise<T> => {
    
   const data = axios.get(url)
        .then((response) => {
            return JSON.parse(response.data.contents)
        })
        return data
  }

  export const getProductFromBarcodePrimary = async (barCode: string):Promise<string> => {
    const url = URL_TYPES.BASE + URL_TYPES.BAR_CODE + barCode

    const data = await HTTP<TProduct>(url)
    
    if (data.Items[0]?.ItemDescription) {
        return data.Items[0].ItemDescription
    }
    
    return "  "
}




export const database = {
    getAllList:async ():Promise<CacheData> => {
        const { data } = await axios.get<RawTlist[][]>(GOOGLE_SHEET)
        const response = data.map((i) => ({
            [i[0].listId]:i,
        }))
        return response
    },

    getList: async (id:string):Promise<RawTlistFull[]> => {
        const { data: response } = await axios.get(`${GOOGLE_SHEET}id=${id}`)
        return response
    },
    createList:async (data:RawTlistFull[]) => {
       await axios.post(GOOGLE_SHEET, JSON.stringify(data))
    },
    createListItem:  async (item:RawTlistFull) => {
        await axios.post(`${GOOGLE_SHEET}action=addItem`, JSON.stringify(item))
    },
    delete:async ({listId, itemId}: {listId?:number , itemId?:number[]}):Promise<RawTlist[][]> => {
        const { data: response } = await axios.post(`${GOOGLE_SHEET}action=delete` ,JSON.stringify({listId, itemId}))
        return response
    },

    update: async (item:RawTlistFull) => {
         await axios.post(`${GOOGLE_SHEET}action=update`, JSON.stringify(item))
        
    },
}


export const recipe = {
    get: async (id:string, portions:string):Promise < TRecipe > => {
       const response = await HTTP<TRecipeResponse>(URL_TYPES.BASE + URL_TYPES.RECIPE + id)
       let portionOptions:string[] | undefined = undefined

        const getIngredients = () => {
            if(response.ExtraPortions && response.ExtraPortions.length > 0){
                const portionsArr = response.ExtraPortions.filter(({Portions}) => Number(Portions) ===  Number(portions))[0]
                portionOptions = response.ExtraPortions.map(({Portions}) => Portions.toString())
                portionOptions = [...Array.from(new Set(portionOptions))]
                return portionsArr.Ingredients.map(({Text}) => Text )
            }
            if(response.IngredientGroups && response.ExtraPortions.length > 0){
                return response.IngredientGroups[0].Ingredients.map((ingredient => ingredient.Text ))
            }
            return ['No Ingredients found :(']
        }

        return {
            Title: response.Title,
            Ingredients: getIngredients(),
            ErrorMessage:response.Message,
            PortionOptions:portionOptions,
            Instructions:response.CookingSteps
        }
     },

     getFavorites: async () => {
        const { data: response } = await axios.get<TFavorites[]>(`${GOOGLE_SHEET}type=favorite`)
        return response

     },

     save: async ({name, id}:{name:string, id:string}) => {
        await axios.post(`${GOOGLE_SHEET}type=favorite`, JSON.stringify({name, id}))
     },

     delete: async (id:string[] | number[]) => {
        await axios.post(`${GOOGLE_SHEET}type=favorite&action=delete`, JSON.stringify({id}))
     },

     alreadySaved: async (id:string):Promise<boolean> => {
         const {data:response } = await axios.get<{alreadySaved:boolean}>(`${GOOGLE_SHEET}type=exist&id=${id}`)
         return response.alreadySaved
     }
}

