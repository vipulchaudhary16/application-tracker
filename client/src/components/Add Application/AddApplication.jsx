import React, { useContext, useState } from 'react';
import { storage } from "../../utils/Firebase";
import {
    ref as storeRef,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import LoadingBar from "react-top-loading-bar";
import { ApplicationContext } from '../../context/applications.context';
import './AddApplication.css'
import { UIContext } from '../../context/ui.controler.context';
import { AlertContext } from '../../context/alert.context';

//css in App.css

const AddApplication = () => {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [url, setUrl] = useState('');
    const [resumeLink, setResumeLink] = useState('');
    const [cvLink, setCvLink] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const { addApplication, loadApplications } = useContext(ApplicationContext)
    const { toggleForm } = useContext(UIContext)
    const {setAlertMessage} = useContext(AlertContext)


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
                        console.log(downloadURL);
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
                        console.log(downloadURL);
                        setCvLink(downloadURL);
                    })
            }
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // submit form data here
        const application = {
            company,
            role,
            status,
            url,
            resume: resumeLink,
            cv: cvLink,
        };
        console.log(application);
        const response = await addApplication(application);
        if (response) {
            setAlertMessage('Application added successfully');
            setCompany('');
            setRole('');
            setStatus('');
            setUrl('');
            setResumeLink('');
            setCvLink('');
            setResumeFile(null);
            setCvFile(null);
            loadApplications();
            toggleForm();
        } else {
            setAlertMessage('Error adding application');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <LoadingBar
                color="#f11946"
                height={10}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
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
            </div>
            <div>
                <label htmlFor="cvFile">CV</label>
                <input type="file" id="cvFile" onChange={handleCvFileChange} accept="application/pdf" />
            </div>
            <button type="submit" className='btn btn-primary'>Add Job Application</button>
        </form>
    );
}

export default AddApplication;
