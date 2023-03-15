import React, { useContext } from "react";
import { ApplicationContext } from "../../context/applications.context";
import { RxCrossCircled } from "react-icons/rx";
import "./Card.css";

const ApplicationCard = ({ application }) => {
    const { company, cv, resume, role, status, url } = application;
    const { updateApplication, deleteApplication } = useContext(ApplicationContext);

    const handleStatusChange = async (e) => {
        const updatedStatus = e.target.value;
        if (updatedStatus) {
            application.status = updatedStatus;
            const res = await updateApplication(application);
            alert(res.message);
            window.location.reload();
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("Are you sure you want to delete this application?");
        if (!confirm) return;
        const res = await deleteApplication(application);
        alert(res.message);
        window.location.reload();
    }

    return (
        <div className="card-container">
            <  RxCrossCircled className="cross-icon" onClick={(e) => handleDelete(e)} />
            <h2>{company}</h2>
            <p className="role-name">{role}</p>
            <p>Status: <select id="status" value={status} onChange={(e) => handleStatusChange(e)}>
                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Ready to Apply">Ready to Apply</option>
                <option value="Offered">Offered</option>
                <option value="Signed">Signed</option>
                <option value="Rejected">Rejected</option>
            </select></p>

            <div className="links-container">
                {
                    resume && (<a href={resume} target="_blank" rel="noopener noreferrer" className="btn  card-btn" > Resume</a>)
                }
                {
                    cv && (<a href={cv} target="_blank" rel="noopener noreferrer" className="btn card-btn" > CV</a>)
                }
                {
                    url && <a href={url} target="_blank" rel="noopener noreferrer" className="btn  card-btn" >Link to Application</a>
                }
            </div>
        </div>
    );
};

export default ApplicationCard;
