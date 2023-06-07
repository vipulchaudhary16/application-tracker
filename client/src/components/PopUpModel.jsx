import React, { useContext } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { UIContext } from '../context/ui.controler.context';
import { ApplicationContext } from '../context/applications.context';

export const PopUpModel = (props) => {
	const { setActiveModeType } = useContext(UIContext)
	const { setUpdatingApplication } = useContext(ApplicationContext)
	
	const handleClose = () => {
		setActiveModeType("")
		setUpdatingApplication(null)
	}

	return (
		<div className='popup '>
			<div className='popup-content'>
				<RxCrossCircled
					className='close'
					onClick={() => {
						handleClose()
					}}
				/>
				{props.children}
			</div>
		</div>
	)
}
