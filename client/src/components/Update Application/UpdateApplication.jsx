import React, { useContext, useEffect, useState } from 'react';
import { storage } from "../../utils/Firebase";
import {
    ref as storeRef,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import LoadingBar from "react-top-loading-bar";
import { ApplicationContext } from '../../context/applications.context';
import { UIContext } from '../../context/ui.controler.context';
import { AlertContext } from '../../context/alert.context';

const UpdateApplication = () => {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [url, setUrl] = useState('');
    const [resumeLink, setResumeLink] = useState('');
    const [cvLink, setCvLink] = useState('');
    const [remark, setRemark] = useState("")
    const { setAlertMessage } = useContext(AlertContext)
    const { updatingApplication, updateApplication, loadApplications } = useContext(ApplicationContext)
    const { setProgress, setActiveModeType } = useContext(UIContext)

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const handleResumeFileChange = (event) => {
        const resume = event.target.files[0];
        const fileStoreRef = storeRef(
            storage,
            `resume/${resume.name}_${Math.random().toString(16).slice(2)}`
        );

        const uploadTask = uploadBytesResumable(fileStoreRef, resume);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                setAlertMessage(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setResumeLink(downloadURL);
                    })
            }
        );
    }

    const handleCvFileChange = (event) => {
        const cv = event.target.files[0];
        const fileStoreRef = storeRef(
            storage,
            `cvs/${cv.name}_${Math.random().toString(16).slice(2)}`
        );

        const uploadTask = uploadBytesResumable(fileStoreRef, cv);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                setAlertMessage(error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setCvLink(downloadURL);
                    })
            }
        );
    }

    useEffect(() => {
        setCompany(updatingApplication.company)
        setRole(updatingApplication.role)
        setStatus(updatingApplication.status)
        setUrl(updatingApplication.url)
        setResumeLink(updatingApplication.resume)
        setCvLink(updatingApplication.cv)
        setRemark(updatingApplication.remark)
    }, [updatingApplication])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const application = {
            _id: updatingApplication._id,
            company,
            role,
            status,
            url,
            remark,
            resume: resumeLink,
            cv: cvLink,
        };
        await updateApplication(application).then((res) => {
            setAlertMessage(res.message);
            loadApplications()

        });
        setActiveModeType("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Update application</p>
            <div>
                <label htmlFor="company">Company</label>
                <input type="text" id="company" value={company} onChange={handleCompanyChange} required />
            </div>
            <div>
                <label htmlFor="role">Role</label>
                <input type="text" id="role" value={role} onChange={handleRoleChange} />
            </div>
            <div>
                <label htmlFor="status">Status</label>
                <select id="status" value={status} onChange={handleStatusChange}>
                    <option value="">Select Status</option>
                    <option value="Ready to Apply">Ready to Apply</option>
                    <option value="Applied">Applied</option>
                    <option value="Offered">Offered</option>
                    <option value="Signed">Signed</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>
            <div>
                <label htmlFor="url">URL</label>
                <input type="text" id="url" value={url} onChange={handleUrlChange} />
            </div>
            <div>
                <label htmlFor="resumeFile">Resume</label>
                <input type="file" id="resumeFile" onChange={handleResumeFileChange} accept="application/pdf" />
                <a href={resumeLink} target='_blank'>View</a>
            </div>
            <div>
                <label htmlFor="cvFile">CV</label>
                <input type="file" id="cvFile" onChange={handleCvFileChange} accept="application/pdf" />
                <a href={cvLink} target='_blank'>View</a>
            </div>
            <div>
                <label htmlFor="remark">Remark if any</label>
                <textarea id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
            </div>
            <button type="submit" className='btn btn-primary'>Update</button>
        </form>
    );
}

export default UpdateApplication;
