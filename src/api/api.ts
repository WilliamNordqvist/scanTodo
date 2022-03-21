import axios from "axios";
import { TProduct, TRecipe, TRecipeResponse, URL_TYPES } from '../types'
  const HTTP =  <T> (url:string): Promise<T> => {
    
   const data = axios.get(url)
        .then((response) => {
            return JSON.parse(response.data.contents)
        })
        return data
  }

  export const getProductFromBarcodePrimary = async (barCode: string):Promise<string> => {
    const url = URL_TYPES.BASE + URL_TYPES.BAR_CODE + barCode

    const data = await HTTP <TProduct> (url)
    
    if (data.Items[0]?.ItemDescription) {
        return data.Items[0].ItemDescription
    }
    
    return "  "
}


export const getRecipe = async (id: string, portions:string): Promise < TRecipe > => {
    const url = URL_TYPES.BASE + URL_TYPES.RECIPE + id
    const data = await HTTP < TRecipeResponse > (url)
    let portionOptions:string[] | undefined = undefined

    const getIngredients = () => {
        if(data.ExtraPortions && data.ExtraPortions.length > 0){
            const portionsArr = data.ExtraPortions.filter(({Portions}) => Number(Portions) ===  Number(portions))[0]
            portionOptions = data.ExtraPortions.map(({Portions}) => Portions.toString())
            portionOptions = [...Array.from(new Set(portionOptions))]
            return portionsArr.Ingredients.map(({Text}) => Text )
        }

        if(data.IngredientGroups){
            return data.IngredientGroups[0].Ingredients.map((ingredient => ingredient.Text ))
        }

        return undefined
    }
    
    return {
        Title: data.Title,
        Ingredients: getIngredients(),
        ErrorMessage:data.Message,
        PortionOptions:portionOptions,
        Instructions:data.CookingSteps
    }
}
