import React, { createContext, useEffect } from 'react'
import { useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const [token, setToken] = useState(null);

    useEffect(()=>{
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
      }
    },[])

  return (
    <AuthContext.Provider value={
        {token , setToken}
    }>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider