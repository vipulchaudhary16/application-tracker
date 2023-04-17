import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
    logIn: async () => { },
    signUp: async () => { },
    currentUser: null,
    loadUser: () => { }
});

export const UserProvider = ({ children }) => {
    const API = 'https://application-tracker-api.vercel.app/api'
    const [currentUser, setCurrentUser] = useState(null)

    const logIn = async ({ email, password }) => {
        try {
            const response = await axios.post(API + '/auth/login', {
                email: email,
                password: password
            });
            return response
        } catch (error) {
            alert(error.request.response)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = () => {
        setCurrentUser(localStorage.getItem('token') != null)
    }

    const signUp = async ({ name, email, password }) => {
        try {
            const response = await axios.post(API + '/auth/register', {
                name,
                email,
                password
            });
            return response

        } catch (error) {
            alert(error.request.response)
        }
    }

    const value = { logIn, signUp, currentUser, loadUser }
    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}