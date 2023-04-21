import React, { useContext } from "react";
import { ApplicationContext } from "../../context/applications.context";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import "./Card.css";
import { AlertContext } from "../../context/alert.context";
import { MODAL_TYPES, UIContext } from "../../context/ui.controler.context";

const ApplicationCard = ({ application }) => {
    const { company, cv, resume, role, status, url, remark: remarks } = application;
    const { updateApplication, deleteApplication, loadApplications, setUpdatingApplication } = useContext(ApplicationContext);
    const { setActiveModeType } = useContext(UIContext);
    const { setAlertMessage } = useContext(AlertContext)

    const handleStatusChange = async (e) => {
        const updatedStatus = e.target.value;
        if (updatedStatus) {
            application.status = updatedStatus;
            const res = await updateApplication(application);
            setAlertMessage(res.message);
            loadApplications();
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("Are you sure you want to delete this application?");
        if (!confirm) return;
        const res = await deleteApplication(application);
        setAlertMessage(res.message);
        loadApplications();
    }

    const handleApplicationUpdate = async () => {
        setActiveModeType(MODAL_TYPES.UPDATE)
        setUpdatingApplication(application)
        // setAlertMessage(res.message);
    }

    return (
        <div className="card-container">
            <span className="operation-icons" >
                <AiOutlineDelete onClick={(e) => handleDelete(e)} />
                <FiEdit onClick={() => handleApplicationUpdate()} />
            </span>
            <h2>{company}</h2>
            <p className="role-name">{role}</p>
            <p>Status:
                <select id="status" value={status} onChange={(e) => handleStatusChange(e)}>
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
            <div>{
                remarks && <>
                    <h2>Remarks:</h2>
                    <p>{remarks.split("\n").map((remark, ind) => <li key={ind} >{remark}</li>)}</p>
                </>
            }
            </div>
        </div>
    );
};

export default ApplicationCard;
