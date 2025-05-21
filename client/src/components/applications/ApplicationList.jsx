import React, { useState, useEffect, useContext } from 'react';
import { ApplicationContext } from '../../context/applications.context';
import ApplicationCard from '../card/ApplicationCard';
import './Applicationlist.css';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { MODAL_TYPES, UIContext } from '../../context/ui.controler.context';

const ApplicationList = () => {
	const { applications, loadApplications } = useContext(ApplicationContext);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilterQuery, setStatusFilterQuery] = useState('');
	const [result, setResult] = useState([]);

	useEffect(() => {
		setResult(applications);
	}, [applications]);

	const { setActiveModeType } = useContext(UIContext);

	/* Search query filter effect*/
	useEffect(() => {
		const query = (application) => {
			return (
				application?.company
					?.toLowerCase()
					.includes(searchQuery.toString().toLowerCase().trim()) ||
				application?.role
					?.toLowerCase()
					.includes(searchQuery.toString().toLowerCase().trim()) ||
				application?.remark
					?.toLowerCase()
					.includes(searchQuery.toString().toLowerCase().trim())
			);
		};
		if (!searchQuery) setResult(applications);
		setResult(applications.filter((application) => query(application)));
	}, [applications, searchQuery]);

	/*status filter query effect*/
	useEffect(() => {
		const query = (application) => {
			return application.status
				.toLowerCase()
				.includes(statusFilterQuery.toString().toLowerCase());
		};
		if (!statusFilterQuery) {
			setResult(applications);
		}
		setResult(applications.filter((application) => query(application)));
	}, [applications, statusFilterQuery]);

	useEffect(() => {
		loadApplications();
	}, []);

	return (
		<>
			<span onClick={() => setActiveModeType(MODAL_TYPES.Application_form)}>
				<AiOutlinePlusSquare
					className='add-icon'
					title='click here to add new job'
				/>
			</span>
			<div className='filter-container'>
				<div className='filters'>
					<input
						type='text'
						name=''
						id=''
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search by Company, Role or Remark '
					/>
					<select
						id='status'
						onChange={(e) => setStatusFilterQuery(e.target.value)}
					>
						<option value=''>Filter by status</option>
						<option value='Ready to Apply'>Ready to Apply</option>
						<option value='Applied'>Applied</option>
						<option value='Offered'>Offered</option>
						<option value='Signed'>Signed</option>
						<option value='Rejected'>Rejected</option>
					</select>
				</div>
			</div>
			<div className='application-list-container'>
				{result.length > 0 &&
					result.map((application) => (
						<ApplicationCard application={application} key={application._id} />
					))}
				{result.length === 0 && (
					<div className='no-applications'>
						<h2>No Applications</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default ApplicationList;
