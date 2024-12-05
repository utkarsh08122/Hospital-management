import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const AppContext = createContext();



const AppContextProvider = ({ children }) => {
  const [doctors,setDoctors] = useState([])
  console.log("this is sthe data ")
  useEffect(()=>{
  console.log("this is sthe data2")

    const getData = async () => {
      const respons = await axios.get("http://localhost:4000/emp/allDoctor");
      if (respons.data.status === "ok") {
        setDoctors(respons.data.result);
      }
    };
    getData();
  },[])

  const currencySymbol = "$";
  const value = {
    doctors,
    currencySymbol,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
