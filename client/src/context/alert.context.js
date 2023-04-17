import { useEffect, useState } from "react";
import { createContext } from "react";

export const AlertContext = createContext({
    alertMessage: null,
    setAlertMessage: () => { },
});

export const AlertProvider = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState("")
    const value = { alertMessage, setAlertMessage }

    useEffect(() => {
        if (alertMessage) {
            setTimeout(() => setAlertMessage(""), 1500)
        }
    }, [alertMessage])

    return <AlertContext.Provider value={value}>
        {children}
    </AlertContext.Provider>
}