import React from 'react'
import { useContext } from 'react'
import { AlertContext } from '../context/alert.context'
import { RxCrossCircled } from "react-icons/rx";

export const Alert = () => {
    const { alertMessage, setAlertMessage } = useContext(AlertContext)
    return (
        <div className='alert-container' >
            <div className="alert-body">
                <p className='alert-text'> {alertMessage}</p>
                <RxCrossCircled className='alert-close-button' onClick={() => setAlertMessage("")} />
            </div>
        </div>
    )
}
