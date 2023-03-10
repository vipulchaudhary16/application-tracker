import React from "react";
import "./card.css";

const ApplicationCard = ({application}) => {
    const { company, cv, resume, role, status, url } = application;

    return (
        <div className="card-container">
            <h2>{company}</h2>
            <p className="role-name">{role}</p>
            <p>Status: {status}</p>
            <div className="links-container">
                <a href={resume} target="_blank" rel="noopener noreferrer">
                    Resume
                </a>
                <a href={cv} target="_blank" rel="noopener noreferrer">
                    CV
                </a>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    Application
                </a>
            </div>
        </div>
    );
};

export default ApplicationCard;
