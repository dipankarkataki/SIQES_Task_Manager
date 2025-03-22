import React from 'react'
import './styles.css'
import brandLogo from '../../assets/logo.png';

const Login = () => {
  return (
    <div className='wrapper'>
        <form className='form'>
            <div className='brand-wrapper'>
                <img src={brandLogo} alt='siqes-logo' className='brand-logo' />
                <h4 className='brand-name'>Task Management Admin Panel</h4>
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='username' className='form-label'>Username</label>
                <input type='email' id='email' name="email" className='form-control' placeholder='jhondoe@xyz.com' />
            </div>
            <div className='form-group mb-3'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='password' id='password' name="password" className='form-control' placeholder='*********' />
            </div>
            <div className='form-btn-wrapper d-grid'>
                <button type='submit' className='btn btn-outline-dark btn-block'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login