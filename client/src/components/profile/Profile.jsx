import React from 'react';
import './Profile.css';
import userImage from '../../assets/user.png';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
	const navigate = useNavigate();

	const handleLogOut = () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<div className='profile'>
			<h1>Profile</h1>
			<div className='profile-container'>
				<div className='profile-left'>
					<img src={userImage} alt='' />
					<div className='profile-left-info'>
						<h4>Username</h4>
						<span>Email</span>
					</div>
					<div className='profile-left-actions'>
						<button className='btn btn-danger'>Delete Profile</button>
						<button className='btn btn-danger' onClick={() => handleLogOut()}>
							Log Out
						</button>
					</div>
				</div>
				<div className='profile-right'>
					<h3>Your Application insights</h3>
					<div className='profile-right-insights'>
						<div className='profile-right-insights-item'>
							<p>Active Applications {0}</p>
							<p>Rejected Applications {0}</p>
							<p>Offered Applications {0}</p>
							<p>Remarked Applications {0}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
