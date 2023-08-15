import React from 'react';
import { Link } from 'react-router-dom';
import welcome from '../assets/job-search.svg';
//css written in App.css

function Welcome() {
	return (
		<div className='home-container'>
			<div className='welcome-action-container'>
				<h1>Job Application Tracker</h1>
				<div className="product-specs-container">

				<p>Keep track of all your job applications in one place.</p>
				<p>You can also add notes and custome resume for each job.</p>
				<p>Sign up or login to get started.</p>
				</div>

				<div className='button-container'>
					<Link to='/login'>
						<button className='btn btn-primary'>LOGIN</button>
					</Link>
					<Link to='/signup'>
						<button className='btn btn-secondary'>SIGNUP</button>
					</Link>
				</div>
			</div>
			<div className='welcome-image-container'>
				<img src={welcome} alt='' />
			</div>
		</div>
	);
}

export default Welcome;
