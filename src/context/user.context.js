import { createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({
    logIn: async () => { },
    signUp: async () => { }

});

export const UserProvider = ({ children }) => {
    const API = 'https://application-tracker-server.vercel.app/api'

    const logIn = async ({email, password}) => {
        try {
            const response = await axios.post(API + '/auth/login', {
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
            const response = await axios.post(API + '/auth/register', {
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