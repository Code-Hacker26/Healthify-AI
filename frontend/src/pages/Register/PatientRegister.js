import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios'; // Axios for API requests
import '../../styles/registration/registration.css'; // Import the unique CSS file
import { auth, provider } from '../../Components/googleSignin/config';  // Firebase config
import { signInWithPopup } from 'firebase/auth';  // Firebase Auth
import useApiHelper from '../../api'; 

const genderChoices = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
];

const PatientRegister = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [googleError, setGoogleError] = useState("");  // Google Sign-in error
    const [isGoogleSignIn, setIsGoogleSignIn] = useState(false); // Track Google Sign-In
    const navigate = useNavigate();
    const api = useApiHelper();
    // Handle Google Sign-In
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const email = result.user.email;
                const username = email.substring(0, email.indexOf("@")) + "1234";
                const name = result.user.displayName;
                
                // Automatically fill form fields
                setFormData({
                    ...formData,
                    email: email || '',
                    username: username || '',
                    name: name || '',
                    mobile: formData.mobile || '',
                    address: formData.address || '',
                    dob: formData.dob || ''
                });

                setIsGoogleSignIn(true);
                localStorage.setItem("email", email);
                localStorage.setItem("username", username);
                localStorage.setItem("name", name);
            })
            .catch((error) => {
                console.log("Google Sign-In Error:", error);
                setGoogleError("Failed to sign in with Google");
            });
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Form validation
    const validateForm = () => {
        const errors = {};
        const { dob, mobile, email, password, password1, address } = formData;

        // DOB Validation
        if (!isGoogleSignIn) {
            const age = calculateAge(dob);
            if (!dob) {
                errors.dob = "DOB is required.";
            } else if (age <= 2) {
                errors.dob = "Age must be greater than 2 years.";
            }
        }

        // Mobile Validation
        if (!isGoogleSignIn) {
            const mobilePattern = /^[0-9]{10}$/;
            if (!mobile) {
                errors.mobile = "Mobile No is required.";
            } else if (!mobilePattern.test(mobile)) {
                errors.mobile = "Mobile number must be exactly 10 digits.";
            }
        }

        // Address Validation
        if (!isGoogleSignIn && !address) {
            errors.address = "Address is required.";
        }

        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            errors.email = "Invalid email format.";
        }

        // Password Match Validation
        if (!isGoogleSignIn) {
            if (password !== password1) {
                errors.password1 = "Passwords do not match.";
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = currentDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const payload = {
                ...formData,
                isGoogleSignIn: isGoogleSignIn,
                mobile: formData.mobile || '',
                address: formData.address || '',
                dob: formData.dob || ''
            };

            api.patientRegister(payload)  // Use the api.patientRegister helper
            .then((res) => {
                navigate('/login/patient/');
            })
            .catch((error) => {
                console.log("Error:", error?.response?.data?.error);
                setError(error?.response?.data?.error);
            });
        }
    };

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            navigate('/');
        }
    }, []);

    return (
        <section className="patient-register-section">
            <div className="patient-register-container">
                <div className="patient-register-box">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                            Create a Patient account
                        </h1>

                        {error && <div className="patient-register-alert" role="alert">{error}</div>}
                        {googleError && <div className="patient-register-alert" role="alert">{googleError}</div>}

                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div className='grid grid-cols-2 gap-3'>
                                <div className="md:col-span-1 col-span-2">
                                    <label htmlFor="username" className="patient-register-label">Username</label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="username"
                                        value={formData.username || ''}
                                        id="username"
                                        className="patient-register-input"
                                        placeholder="Username"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-1 col-span-2">
                                    <label htmlFor="name" className="patient-register-label">Name</label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="name"
                                        value={formData.name || ''}
                                        id="name"
                                        className="patient-register-input"
                                        placeholder="Name"
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2 col-span-2">
                                    <label htmlFor="email" className="patient-register-label">Email</label>
                                    <input
                                        type="email"
                                        onChange={handleChange}
                                        name="email"
                                        value={formData.email || ''}
                                        id="email"
                                        className="patient-register-input"
                                        placeholder="name@company.com"
                                        required
                                    />
                                    {validationErrors.email && <span className="error-text">{validationErrors.email}</span>}
                                </div>

                                <div className="md:col-span-1 col-span-2">
                                    <label htmlFor="dob" className="patient-register-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        onChange={handleChange}
                                        name="dob"
                                        id="dob"
                                        className="patient-register-input"
                                        required={!isGoogleSignIn}
                                    />
                                    {validationErrors.dob && <span className="error-text">{validationErrors.dob}</span>}
                                </div>

                                <div className="md:col-span-1 col-span-2">
                                    <label htmlFor="gender" className="patient-register-label">Gender</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="patient-register-input"
                                        onChange={handleChange}
                                    >
                                        <option selected>Choose gender</option>
                                        {genderChoices.map((gender, idx) => (
                                            <option key={idx} value={gender.value}>{gender.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="md:col-span-1 col-span-2">
                                    <label htmlFor="address" className="patient-register-label">Address</label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="address"
                                        id="address"
                                        className="patient-register-input"
                                        placeholder="Address"
                                        required={!isGoogleSignIn}
                                    />
                                    {validationErrors.address && <span className="error-text">{validationErrors.address}</span>}
                                </div>

                                <div className="md:col-span-1 col-span-2">
                                    <label htmlFor="mobile" className="patient-register-label">Mobile</label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        name="mobile"
                                        id="mobile"
                                        className="patient-register-input"
                                        placeholder="Mobile"
                                        required={!isGoogleSignIn}
                                    />
                                    {validationErrors.mobile && <span className="error-text">{validationErrors.mobile}</span>}
                                </div>

                                <div className="md:col-span-1 col-span-2">
                                    <label htmlFor="password" className="patient-register-label">Password</label>
                                    <input
                                        type="password"
                                        onChange={handleChange}
                                        name="password"
                                        value={formData.password || ''}
                                        id="password"
                                        className="patient-register-input"
                                        placeholder="••••••••"
                                        required={!isGoogleSignIn}
                                    />
                                </div>

                                <div className="md:col-span-1 col-span-2">
                                    <label htmlFor="password1" className="patient-register-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        onChange={handleChange}
                                        name="password1"
                                        value={formData.password1 || ''}
                                        id="password1"
                                        className="patient-register-input"
                                        placeholder="••••••••"
                                        required={!isGoogleSignIn}
                                    />
                                    {validationErrors.password1 && <span className="error-text">{validationErrors.password1}</span>}
                                </div>

                                <button type="submit" className="btn-submit-patient-register">Register</button>
                                <button type="button" onClick={handleGoogleSignIn} className="btn-google-register">Sign Up with Google</button>
                            </div>

                            <p className="text-sm font-light text-gray-500">
                                Already have an account? <Link to="/login/patient" className="font-medium text-primary-600 hover:underline">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PatientRegister;
