import '../../styles/login.css'; // Import unique CSS for login
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useApiHelper from '../../api';
import Cookies from 'js-cookie';
import GlobalContext from '../../context/GlobalContext';

const DoctorLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const api = useApiHelper();
    const gContext = useContext(GlobalContext);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        api.doctorLogin(formData).then(res => {
            Cookies.set('accessToken', res?.token?.access);
            gContext.setIsLoggedIn(true);
            gContext.setUser(res?.token?.user);
            navigate('/');
        }).catch(error => {
            setError(error?.response?.data?.error || 'An error occurred');
        });
    };

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <section className="login-page">
            <div className="login-container">
                {/* <Link to="/" className="login-logo">
                    <img className="login-logo-img" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                </Link> */}
                <div className="login-form-container">
                    <div className="login-form">
                        <h1 className="login-title">Sign in as a Doctor</h1>
                        {error && (
                            <div className="login-error-message" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="login-form-fields">
                            <div className="login-form-group">
                                <label htmlFor="username" className="login-label">Username</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="username"
                                    id="username"
                                    className="login-input"
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            <div className="login-form-group">
                                <label htmlFor="password" className="login-label">Password</label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="login-input"
                                    required
                                />
                            </div>
                            <div className="login-remember-container">
                                <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    className="login-checkbox"
                                />
                                <label htmlFor="remember" className="login-remember-label">Remember me</label>
                            </div>
                            <button type="submit" className="login-submit-button">Sign in</button>
                            <p className="login-register-link">
                                Don't have an account? Register as <Link to="/register/doctor/" className="login-register-link-text">Doctor
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default DoctorLogin