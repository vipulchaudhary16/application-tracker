import React, { useState, useEffect, useContext } from "react";
import { ApplicationContext } from "../../context/applications.context";
import ApplicationCard from "../Card/ApplicationCard";
import "./Applicationlist.css";

const ApplicationList = () => {
    const [applications, setApplications] = useState([])
    const { getAllApplications } = useContext(ApplicationContext)

    useEffect(() => {
        load()
    }, [])
    const load = async () =>
        setApplications(await getAllApplications())


    return (
        <div className="application-list-container">
            {applications.map((application) => (
                <ApplicationCard application={application} />
            ))}
            {
                applications.length === 0 && (
                    <div className="no-applications">
                        <h2>No Applications</h2>
                    </div>
                )
            }
        </div>
    );
};

export default ApplicationList;
