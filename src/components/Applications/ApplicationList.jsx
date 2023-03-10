import React, { useState, useEffect, useContext } from "react";
import { ApplicationContext } from "../../context/applications.context";
import ApplicationCard from "../card/ApplicationCard";
import "./applicationlist.css";

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
        </div>
    );
};

export default ApplicationList;
