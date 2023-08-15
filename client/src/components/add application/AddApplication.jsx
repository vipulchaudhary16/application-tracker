import React, { useContext, useEffect, useState } from 'react';
import { storage } from "../../utils/Firebase";
import {
	ref as storeRef,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import './AddApplication.css'
import { ApplicationContext } from '../../context/applications.context';
import { UIContext } from '../../context/ui.controler.context';
import { AlertContext } from '../../context/alert.context';

const DEFAULT_VALUES = {
	company: "",
	role: "",
	status: "Ready To Apply",
	url: "",
	resume: "",
	cv: "",
	remark: ""
}

//css in App.css
const AddApplication = ({ updatingApplication }) => {
	const [application, setApplication] = useState(DEFAULT_VALUES)
	const { addApplication, updateApplication, loadApplications, setUpdatingApplication } = useContext(ApplicationContext)
	const { setActiveModeType, setProgress } = useContext(UIContext)
	const [uploading, setUploading] = useState(false)
	const { setAlertMessage } = useContext(AlertContext)
	const { setIsLoading } = useContext(UIContext)

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setApplication({ ...application, [name]: value })
	}

	useEffect(() => {
		if (updatingApplication) setApplication(updatingApplication)
	}, [updatingApplication])

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const { name } = event.target

		if (file.size > 2000000) {
			setAlertMessage("File size exceeded")
			return
		}
		setUploading(true)
		const fileStoreRef = storeRef(
			storage,
			`job-app/${file.name}_${Math.random().toString(16).slice(2)}`
		);

		const uploadTask = uploadBytesResumable(fileStoreRef, file);
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
						setApplication({ ...application, [name]: downloadURL });
						setUploading(false)
					})
			}
		);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		const action = updatingApplication ? updateApplication : addApplication;
		const message = updatingApplication ? 'Application updated successfully' : 'Application added successfully';

		try {
			await action(application);
			setAlertMessage(message);
			setApplication(DEFAULT_VALUES);
		} catch (e) {
			setAlertMessage('Error adding application');
		} finally {
			setIsLoading(false);
		}

		setActiveModeType('');
		loadApplications();
		setUpdatingApplication(null)
	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<p>{updatingApplication ? "Update" : "Add"} new application</p>
			<div>
				<label htmlFor="company">Company *</label>
				<input type="text" id="company" name='company' value={application.company} onChange={(e) => handleInputChange(e)} required />
			</div>
			<div>
				<label htmlFor="role">Role *</label>
				<input type="text" id="role" name='role' value={application.role} onChange={(e) => handleInputChange(e)} required />
			</div>
			<div>
				<label htmlFor="status">Status</label>
				<select id="status" name='status' value={application.status} onChange={(e) => handleInputChange(e)}>
					<option value="Ready to Apply">Ready to Apply</option>
					<option value="Applied">Applied</option>
					<option value="Offered">Offered</option>
					<option value="Signed">Signed</option>
					<option value="Rejected">Rejected</option>
				</select>
			</div>
			<div>
				<label htmlFor="url">URL</label>
				<input type="text" id="url" name='url' value={application.url} onChange={(e) => handleInputChange(e)} />
			</div>
			<div>
				<label htmlFor="resumeFile">Resume (max size 2 MB)</label>
				<input type="file" id="resumeFile" name='resume' onChange={(e) => handleFileChange(e)} accept="application/pdf" />
				{updatingApplication ? <a href={application.resume} target='_blank' rel="noreferrer">View</a> : null}
			</div>
			<div>
				<label htmlFor="cvFile">CV (max size 2 MB)</label>
				<input type="file" id="cvFile" name='cv' onChange={(e) => handleFileChange(e)} accept="application/pdf" />
				{updatingApplication ? <a href={application.cv} target='_blank' rel="noreferrer">View</a> : null}
			</div>
			<div>
				<label htmlFor="remark">Remark if any</label>
				<textarea id="remark" name='remark' value={application.remark} onChange={(e) => handleInputChange(e)} />
			</div>
			{
				uploading === false ?
					<button type="submit" className='btn btn-primary'>{updatingApplication ? "Update" : "Add"} Job Application</button> :
					<button className='btn btn-primary'>Uploading files...</button>
			}
		</form>
	);
}

export default AddApplication;
