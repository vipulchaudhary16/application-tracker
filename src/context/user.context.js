import { createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({
    logIn: async () => { },
    signUp: async () => { }

});


export const UserProvider = ({ children }) => {
    const HOST = 'http://localhost:8000/api'

    const logIn = async ({email, password}) => {
        try {
            const response = await axios.post(HOST + '/auth/login', {
                email: email,
                password: password
            });
            return response
        } catch (error) {
            console.error(error);
            alert(error.request.response)
        }
    }

    const signUp = async ({name, email, password}) => {
        try {
            const response = await axios.post(HOST + '/auth/register', {
                name,
                email,
                password
            });
            return response
           
        } catch (error) {
            alert (error.request.response)
        }
    }
    const value = { logIn, signUp }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}