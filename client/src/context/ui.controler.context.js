import { useState } from "react";
import { createContext } from "react";

export const UIContext = createContext({
    toggleForm: () => { },
    formDisplay: false,
});

export const UIProvider = ({ children }) => {
    const [formDisplay, setFormDisplay] = useState(false)

    const toggleForm = () => {
        setFormDisplay(!formDisplay)
    }

    const value = { toggleForm, formDisplay }
    return <UIContext.Provider value={value}>
        {children}
    </UIContext.Provider>
}