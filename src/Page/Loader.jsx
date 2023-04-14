import React from 'react'
import { DotLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className='h-[100vh] max-w-[420px] w-[100%] flex justify-center items-center'>
            <DotLoader color="#0b6e99" />
        </div>
    )
}

export default Loader