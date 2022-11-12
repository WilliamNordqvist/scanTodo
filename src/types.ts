


type Sizes = 'xsmall' | 'small' | 'medium' | 'normal' | 'large' | 'xlarge' | 'xxlarge'

export enum ColorNames {
PRIMARY_BACKGROUND = 'primaryBackground',
SECONDARY_BACKGROUND = 'secondaryBackground',
PRIMARY_TEXT_COLOR ='primaryTextColor',
SECONDARY_TEXT_COLOR ='secondaryTextColor',
INPUT_COLOR ='inputColor',
SETTING_ICON ='settingIcon',
PLUS_ICON ='plusIcon',
LIST_CARD ='listCard',
TRASH_ICON = 'trashIcon',
STAR_ICON = 'starIcon',
PRIMARY_BUTTON_COLOR ='primaryButtonColor',
PRIMARY_BUTTON_TEXT_COLOR = 'primaryButtonTextColor',
SECONDARY_BUTTON_COLOR ='secondaryButtonColor',
SECONDARY_BUTTON_TEXT_COLOR ='secondaryButtonTextColor',
DELETE_BUTTON_COLOR ='deleteButtonColor',
DELETE_BUTTON_TEXT_COLOR ='deleteButtonTextColor',
CAMERA_ICON = 'cameraIcon',
UNCHECKED_ICON ='unCheckedIcon',
CHECKED_ICON ='checkedIcon',
PRIMARY_LIST_ROW = 'primaryListRow',
PRIMARY_LIST_ROW_TEXT ='primaryListRowText',
SECONDARY_LIST_ROW ='secondaryListRow',
SECONDARY_LIST_ROW_TEXT ='secondaryListRowText',
SELECTOR_COLOR ='selectorColor',
SELECTOR_TEXT_COLOR ='selectorTextColor',
}

export type ThemeColors =  Record<ColorNames, string>


export type Theme = {
    color: ThemeColors, 
    width:Record<'medium' | 'large', string>, 
    sizes:Record<Sizes, string>, 
    device:{mobile:string},

}

export type TProduct = {
    Items: [{
        ArticleGroup: number,
        ArticleGroupExtended: number,
        ArticleId: number,
        ItemDescription: string,
        Upc: string,
    }] 
}

export type TRecipe = {
    Title:string,
    Ingredients:string[],
    ErrorMessage?:string,
    PortionOptions?:string[],
    Instructions?:string[],
}

export type RawTlist = {
    name: string, 
    items: string,
    listId: number,
}
export type RawTlistFull = {
    name: string, 
    items: string,
    listId: number,
    isChecked:boolean,
    itemId:number | string
}

  export type TFavRec = {
    name:string,
    id:string;
  }

  export type CacheData = {
    [id:number]:RawTlist[]
  }[]

export type TRecipeResponse = {
    Id:                     number;
    Title:                  string;
    ImageId:                number;
    ImageUrl:               string;
    IngredientGroups:       ExtraPortion[];
    ExtraPortions:          ExtraPortion[];
    PreambleHTML:           string;
    PreparationAdvice:      string;
    DietaryInfo:            string;
    ClimateAdjustments:     string;
    NutritionPerPortion:    NutritionPerPortion;
    CarbonPerPortion:       number;
    NumberOfCarbonLeaves:   number;
    IsGoodClimateChoice:    boolean;
    IsKeyHole:              boolean;
    CookingSteps:           string[];
    CookingStepsWithTimers: CookingStepsWithTimer[];
    CurrentUsersRating:     string;
    AverageRating:          string;
    Difficulty:             string;
    CookingTime:            string;
    CookingTimeAbbreviated: string;
    Portions:               number;
    PortionsDescription:    string;
    Categories:             any[];
    MdsaCategories:         string[];
    MoreLikeThis:           number[];
    OfferCount:             number;
    CommentCount:           number;
    Message?:                string;

}

 type CookingStepsWithTimer = {
    Description:     string;
    TimersInMinutes: number[];
}

 type ExtraPortion = {
    Portions:    number;
    Ingredients: Ingredient[];
    GroupName?:  string;
}

 type Ingredient = {
    Text:             string;
    IngredientId:     number;
    Quantity:         number;
    MinQuantity:      number;
    QuantityFraction: string;
    Ingredient:       string;
    Unit?:            Unit;
}

 enum Unit {
    DL = "dl",
    G = "g",
    Msk = "msk",
    Tsk = "tsk",
}

 type NutritionPerPortion = {
    Carbohydrate: number;
    Fat:          number;
    Protein:      number;
    Salt:         number;
    KCalories:    number;
    KJoule:       number;
}

export type TFavorites = {
    name:string,
    id:number
}

export enum URL_TYPES {
    BASE = 'https://api.allorigins.win/get?url=',
    BAR_CODE = 'https://handla.api.ica.se/api/upclookup?upc=',
    RECIPE = 'https://handla.api.ica.se/api/recipes/recipe/',
    GOOGLE_SHEET = 'https://script.google.com/macros/s/AKfycbxvVS7dsG9FDuSAcu-hFw4lxZiARL23cH-0ppyefck1-zB2rehYuiWrXv9Lzg55WmFF/exec?'
}
