import React, { useEffect } from 'react'
import { useContext } from 'react';
import { createContext,useState } from 'react'


const styleProvider=createContext();
export const StylingProvider = ({children}) => {
const [fontSize,setFontSize]=useState(16);
const [themes,setThemes]=useState('light'); 
useEffect(()=>{
 
document.documentElement.style.setProperty("--app-font-size",`${fontSize}px`)


},[fontSize]);
 useEffect(() => {
    document.documentElement.setAttribute('data-theme', themes);
  }, [themes]);
const fontSetter=(font)=>{
    setFontSize(font);
   
}
const themeSetter=(theme)=>{
 setThemes(theme)
}

  return (
   <styleProvider.Provider value={{fontSetter,themeSetter}}>
{children}
   </styleProvider.Provider>
  )
}

export const useStyles=()=>useContext(styleProvider);