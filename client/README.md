```
import { useState } from "react";
import { createContext } from "react";

export const AlertContext = createContext({
});

export const AlertProvider = ({ children }) => {

    const value = {  }
    return <AlertContext.Provider value={value}>
        {children}
    </AlertContext.Provider>
}
```