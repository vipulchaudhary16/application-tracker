import { createContext } from "react";

export const ApplicationContext = createContext({
    getAllApplications: async () => { },
    addApplication: async (application) => { },
    updateApplication: async (application) => { },
    deleteApplication: async (application) => { },
})

export const ApplicationProvider = ({ children }) => {
    const HOST = 'http://localhost:8000/api/application'

    const getAllApplications = async () => {
        const response = await fetch(`${HOST}/get-all`, {
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
        const response = await fetch(`${HOST}/add`, {
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
        const response = await fetch(`${HOST}/update/${application._id}`, {
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
        const response = await fetch(`${HOST}/delete/${application._id}`, {
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