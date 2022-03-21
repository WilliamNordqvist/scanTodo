import { useEffect, useState } from "react"
import { ref, set, onValue, DataSnapshot } from "firebase/database";
import {theme as defaultTheme} from '../theme'
import { Theme, ThemeColors } from "../types"
import { DB_TYPES, TGlobalStyles } from './types'
import database from "../db/config";

export const useStyles = ():TGlobalStyles => {
    const [theme, setTheme] = useState<Theme>(defaultTheme)
    
    useEffect(() => {
        const itemsRef = ref(database,DB_TYPES.THEME);    
        onValue(itemsRef, (snapshot:DataSnapshot) => {
            const dbTheme: Theme = snapshot.val()
            if(dbTheme){
                setTheme(dbTheme)
            }
            
        })

    }, [])

    const changeColor = (newColors:ThemeColors) => {
        const newTheme = {...theme, color: newColors}
        setTheme(newTheme)
        set(ref(database,DB_TYPES.THEME),newTheme)
    }

    return {
        theme, 
        changeColor
    }
}
