import React, { useContext } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { UIContext } from '../context/ui.controler.context';

export const PopUpModel = (props) => {
    const { setActiveModeType } = useContext(UIContext)
    return (
        <div className='popup '>
            <div className='popup-content'>
                <RxCrossCircled
                    className='close'
                    onClick={() => {
                        setActiveModeType("")
                    }}
                />
                {props.children}
            </div>
        </div>
    )
}
