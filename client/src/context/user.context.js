import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
    logIn: async () => { },
    signUp: async () => { },
    currentUser: null,
    loadUser: () => { }
});

export const UserProvider = ({ children }) => {
    const API = `${process.env.REACT_APP_BACKEND_URL}/api/auth`
    const [currentUser, setCurrentUser] = useState(null)

    const logIn = async ({ email, password }) => {
        try {
            const response = await axios.post(API + '/login', {
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
            const response = await axios.post(API + '/register', {
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