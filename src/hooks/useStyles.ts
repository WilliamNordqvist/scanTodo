import {theme as defaultTheme} from '../theme'
import { ColorNames } from "../types"
import { TGlobalStyles } from './types'
import { useMutation, useQuery } from "react-query";
import { theme as apitheme } from "../api/api"

export const useStyles = ():TGlobalStyles => {
    const { data, refetch } = useQuery("theme", apitheme.get);
    const { mutate: save } = useMutation(apitheme.save);
    const changeColor = (newColors:{name:ColorNames, newColor:string}[]) => {
        save(newColors)
        refetch();
    }

    return {
        theme:{...defaultTheme, color:{...data || defaultTheme.color}},
        changeColor
    }
}
