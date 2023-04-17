import { useState } from "react";
import { createContext } from "react";

export const UIContext = createContext({
    activeModel: '',
    setActiveModeType: () => { },
    progress: 0,
    setProgress: () => { }
});

export const MODAL_TYPES = {
    ADD: "add",
    UPDATE: 'update'
}

export const UIProvider = ({ children }) => {
    const [activeModel, setActiveMode] = useState(false)
    const [progress, setProgress] = useState(0)

    const setActiveModeType = (type) => {
        setActiveMode(type)
    }

    const value = { setActiveModeType, activeModel, progress, setProgress }
    return <UIContext.Provider value={value}>
        {children}
    </UIContext.Provider>
}