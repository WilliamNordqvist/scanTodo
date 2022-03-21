import { Theme } from "./types";

enum defaultColors {
    WHITE = "#f4f1de",
    BLUE = "#3D405B",
    BLACK='#000000',
    YELLOW='#F2CC8F',
    RED = '#D9534F',
    GREEN = '#81B29A',
}


export const theme:Theme = {
    color: {
        cameraIcon:defaultColors.WHITE,
        checkedIcon:defaultColors.YELLOW,
        deleteButtonColor:defaultColors.RED,
        deleteButtonTextColor:defaultColors.WHITE,
        inputColor:defaultColors.WHITE,
        listCard:defaultColors.YELLOW,
        plusIcon:defaultColors.WHITE,
        primaryBackground:defaultColors.WHITE,
        primaryButtonColor:defaultColors.GREEN,
        primaryButtonTextColor:defaultColors.BLACK,
        primaryListRow:defaultColors.WHITE,
        primaryListRowText:defaultColors.BLACK,
        primaryTextColor:defaultColors.WHITE,
        secondaryBackground:defaultColors.BLUE,
        secondaryButtonColor:defaultColors.YELLOW,
        secondaryButtonTextColor:defaultColors.WHITE,
        secondaryListRow:defaultColors.YELLOW,
        secondaryListRowText:defaultColors.BLACK,
        secondaryTextColor:defaultColors.BLACK,
        selectorColor:defaultColors.WHITE,
        selectorTextColor:defaultColors.WHITE,
        settingIcon:defaultColors.WHITE,
        starIcon:defaultColors.WHITE,
        trashIcon:defaultColors.RED,
        unCheckedIcon:defaultColors.WHITE,
    },

    width: {
      medium:'25rem',
      large:'40rem',
    },

    sizes:{
        xsmall:'.5rem',
        small:'1rem',
        medium:'2rem',
        normal:'2.5rem',
        large:'4rem',
        xlarge:'8rem',
        xxlarge:'10rem',
        
    },

    device: {
        mobile:'max-width: 600px'
    }
}


