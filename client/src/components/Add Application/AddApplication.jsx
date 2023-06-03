import React, { useContext, useState } from 'react';
import { storage } from "../../utils/Firebase";
import {
	ref as storeRef,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { ApplicationContext } from '../../context/applications.context';
import './AddApplication.css'
import { UIContext } from '../../context/ui.controler.context';
import { AlertContext } from '../../context/alert.context';

//css in App.css
const AddApplication = () => {
	const [company, setCompany] = useState('');
	const [role, setRole] = useState('');
	const [status, setStatus] = useState('Ready to Apply');
	const [url, setUrl] = useState('');
	const [resumeLink, setResumeLink] = useState('');
	const [cvLink, setCvLink] = useState('');
	const [remark, setRemark] = useState("")
	const { addApplication, loadApplications } = useContext(ApplicationContext)
	const { setActiveModeType, setProgress } = useContext(UIContext)
	const [uploading, setUploading] = useState(false)
	const { setAlertMessage } = useContext(AlertContext)
	const {setIsLoading} = useContext(UIContext)

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
		if (resume.size > 2000000) {
			setAlertMessage("File size exceeded")
			return
		}
		setUploading(true)
		const fileStoreRef = storeRef(
			storage,
			`job-app/${resume.name}_${Math.random().toString(16).slice(2)}`
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
				setUploading(false)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadURL) => {
						setResumeLink(downloadURL);
						setUploading(false)
					})
			}
		);
	}

	const handleCvFileChange = (event) => {
		const cv = event.target.files[0];
		if (cv.size > 2000000) {
			setAlertMessage("File size exceeded")
			return
		}
		setUploading(true)
		const fileStoreRef = storeRef(
			storage,
			`job-app/${cv.name}_${Math.random().toString(16).slice(2)}`
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
				setUploading(false)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadURL) => {
						setCvLink(downloadURL);
						setUploading(false)
					})
			}
		);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true)
		// submit form data here
		const application = {
			company,
			role,
			status,
			url,
			remark,
			resume: resumeLink,
			cv: cvLink,
		};
		await addApplication(application).then((res) => {
			if (res.errors) {
				setAlertMessage("Something went wrong")
				return
			}
			setAlertMessage('Application added successfully');
			setCompany('');
			setRole('');
			setStatus('');
			setUrl('');
			setResumeLink('');
			setCvLink('');
			setRemark("")
			loadApplications();
			setActiveModeType("")
		}).catch((error) => {
			setAlertMessage('Error adding application');
		})
		setIsLoading(false)
	}

	return (
		<form onSubmit={handleSubmit}>
			<p>Add new application</p>
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
					{/* <option value="">Select Status</option> */}
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
				<label htmlFor="resumeFile">Resume (max size 2 MB)</label>
				<input type="file" id="resumeFile" onChange={handleResumeFileChange} accept="application/pdf" />
			</div>
			<div>
				<label htmlFor="cvFile">CV (max size 2 MB)</label>
				<input type="file" id="cvFile" onChange={handleCvFileChange} accept="application/pdf" />
			</div>
			<div>
				<label htmlFor="remark">Remark if any</label>
				<textarea id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
			</div>
			{
				uploading === false ?
					<button type="submit" className='btn btn-primary'>Add Job Application</button> :
					<button className='btn btn-primary'>Uploading files...</button>
			}
		</form>
	);
}

export default AddApplication;
