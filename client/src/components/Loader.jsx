import React from 'react'
import { Circles } from "react-loader-spinner"

//React Loader Spinner
export const Loader = () => {
    return (
        <div className='absolute-loader'>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}