import React, { useContext } from 'react';
import user from '../../assets/user.png';
import './Navbar.css';
import { UserContext } from '../../context/user.context';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<nav className='navbar'>
			<div className='navbar-logo'>
				<Link to='/'>
					<span>Next Job</span>
				</Link>
			</div>
			<div className='navbar-right'>
				{currentUser ? (
					<Link to='me'>
						<img src={user} alt='' />
					</Link>
				) : null}
			</div>
		</nav>
	);
};

export default Navbar;
