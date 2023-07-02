import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Utils/themeOptions";


const ThemeContext = createContext();

export const ThemeContextProvider = ({children})=>{

    //code for if user refresh the page theme not gone
    
     const defaultValue = JSON.parse(localStorage.getItem('theme')) || themeOptions[3].value;
    const [theme, setTheme] = useState(defaultValue);

    const values={
        theme, 
        setTheme
    }

    return (
        <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext);