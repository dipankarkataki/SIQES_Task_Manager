import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css'
import brandLogo from '../../assets/logo.png';
import API from "../../services/Api";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await API.post("/login", { email, password });
            console.log(res.data.success)
            if(res.data.success === true){
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/");
            }else{
                alert("Invalid Credentials")
            }
            
        } catch (err) {
            console.log(err)
            alert("Invalid credentials");
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='wrapper-login'>
            <form className='form' onSubmit={handleLogin}>
                <div className='brand-wrapper'>
                    <img src={brandLogo} alt='siqes-logo' className='brand-logo' />
                    <h4 className='brand-name'>Task Management Admin Panel</h4>
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='username' className='form-label'>Email</label>
                    <input type='email' id='email' name="email" value={email} className='form-control' placeholder='jhondoe@xyz.com' onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor='password' className='form-label'>Password</label>
                    <input type='password' id='password' name="password" value={password} className='form-control' placeholder='*********' onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='form-btn-wrapper d-grid'>
                    <button type='submit' className='btn btn-outline-dark btn-block' disabled={isLoading} >{isLoading ? "Please wait..." : "Login"}</button>
                </div>
            </form>
        </div>
    )
}

export default Login;