import { createContext } from "react";

export const ApplicationContext = createContext({
    getAllApplications: async () => { },
    addApplication: async (application) => { },
    updateApplication: async (application) => { },
    deleteApplication: async (application) => { },
})

export const ApplicationProvider = ({ children }) => {
    const API = 'https://application-tracker-server.vercel.app/api'

    const getAllApplications = async () => {
        const response = await fetch(`${API}/get-all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        console.log(json)
        return json
    }

    const addApplication = async (application) => {
        const response = await fetch(`${API}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(application)
        });
        const json = await response.json();
        console.log(json)
        return json
    }

    const updateApplication = async (application) => {
        const response = await fetch(`${API}/update/${application._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(application)
        });
        const json = await response.json();
        console.log(json)
        return json
    }

    const deleteApplication = async (application) => {
        const response = await fetch(`${API}/delete/${application._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
        const json = await response.json();
        console.log(json)
        return json
    }

    const value = { getAllApplications, addApplication, updateApplication, deleteApplication }
    return <ApplicationContext.Provider value={value} >
        {children}
    </ApplicationContext.Provider>
}