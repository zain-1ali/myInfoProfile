import React from 'react'
import './Notfound.css'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineLock } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import logo from '../../imgs/myinfologo.png';

const Notfound = () => {
    let navigate = useNavigate();
    return (
        <div className='myconatainer'>
            <div className="myinnercontainer">
                <AiOutlineUser className='usericon' />
                <AiOutlineLock className='lockicon' />
                <div className='p1'>This profile is not activatied in our system</div>
                <button onClick={() => { navigate('/') }} className='mybutton'>Go Back</button>
            </div>
            <div className="last-container">
                <img src={logo} alt="Wajj" className='myimg shadow-sm' />
                <p className='p2'>Powerd by My Info</p>
                <p className='p3'>Get yours now at <a href="http://myinfo.app/" className='link'>myinfo.app</a></p>
            </div>
        </div>
    )
}

export default Notfound

