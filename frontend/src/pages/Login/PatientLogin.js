import '../../styles/login.css'; // Import unique CSS for login
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useApiHelper from '../../api';
import Cookies from 'js-cookie';
import GlobalContext from '../../context/GlobalContext';
import { auth, provider } from '../../Components/googleSignin/config'; // Firebase config
import { signInWithPopup } from 'firebase/auth'; // Firebase Auth

const PatientLogin = () => {
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

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const username = result.user.email.split('@')[0]+1234; // Get username from email
            // Create a payload with Google sign-in data
            console.log("Google Sign-In Username:", username); // Print the username
        
            const payload = { username, isGoogleSignIn: true };

            const res = await api.patientLogin(payload);
            Cookies.set('accessToken', res?.token?.access);
            gContext.setIsLoggedIn(true);
            gContext.setUser(res?.token?.user);
            navigate('/');
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            setError("Failed to sign in with Google");
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        // Proceed with normal login
        api.patientLogin(formData).then(res => {
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
                <div className="login-form-container">
                    <div className="login-form">
                        <h1 className="login-title">Sign in as a Patient</h1>
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
                                    required // Always required for normal login
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
                                    required // Always required for normal login
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
                            <button type="button" onClick={handleGoogleSignIn} className="login-google-button">Sign in with Google</button>
                            <p className="login-register-link">
                                Don't have an account? Register as <Link to="/register/patient/" className="login-register-link-text">Patient</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PatientLogin;
