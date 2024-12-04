import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useApiHelper from '../../api';
import Cookies from 'js-cookie';
import '../../styles/registration/doctorregister.css'; // Import the CSS file

const genderChoices = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
]

const specializations = [
    { label: 'Rheumatologist', value: 'Rheumatologist' },
    { label: 'Cardiologist', value: 'Cardiologist' },
    { label: 'ENT specialist', value: 'ENT specialist' },
    { label: 'Neurologist', value: 'Neurologist' },
    { label: 'Allergist/Immunologist', value: 'Allergist/Immunologist' },
    { label: 'Urologist', value: 'Urologist' },
    { label: 'Dermatologist', value: 'Dermatologist' },
    { label: 'Gastroenterologist', value: 'Gastroenterologist' }
];

const DoctorRegister = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const api = useApiHelper();

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const validateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    }

    const validateMobile = (mobile) => {
        const mobileRegex = /^[0-9]{10}$/;
        return mobileRegex.test(mobile);
    }

    const handleSubmit = e => {
        e.preventDefault();

        const age = validateAge(formData.dob);
        const isMobileValid = validateMobile(formData.mobile);

        if (age <= 2) {
            setError("Age must be greater than 2 years.");
            return;
        }

        if (!isMobileValid) {
            setError("Mobile number must be exactly 10 digits.");
            return;
        }

        api.doctorRegister(formData).then(res => {
            navigate('/login/doctor/');
        }).catch(error => {
            setError(error?.response?.data?.error);
        });
    }

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            navigate('/')
        }
    }, [navigate]);

    return (
        <section className="doctor-register-section">
            <div className="doctor-register-container">
                <div className="doctor-register-box">
                    <h1 className="doctor-register-text-sm">
                        Create a Doctor account
                    </h1>
                    {error &&
                        <div className="doctor-register-alert" role="alert">
                            {error}
                        </div>}
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div className='grid grid-cols-2 gap-3'>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="username" className="doctor-register-label">Username</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="username"
                                    id="username"
                                    className="doctor-register-input"
                                    placeholder="Username"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="name" className="doctor-register-label">Name</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="name"
                                    id="name"
                                    className="doctor-register-input"
                                    placeholder="Name"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="email" className="doctor-register-label">Email</label>
                                <input
                                    type="email"
                                    onChange={handleChange}
                                    name="email"
                                    id="email"
                                    className="doctor-register-input"
                                    placeholder="name@company.com"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="dob" className="doctor-register-label">Date of Birth</label>
                                <input
                                    type="date"
                                    onChange={handleChange}
                                    name="dob"
                                    id="dob"
                                    className="doctor-register-input"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="gender" className="doctor-register-label">Gender</label>
                                <select
                                    id="gender"
                                    className="doctor-register-input"
                                    name="gender"
                                    onChange={handleChange}
                                >
                                    <option selected>Choose gender</option>
                                    {genderChoices.map((gender, idx) => (
                                        <option key={idx} value={gender.value}>{gender.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="address" className="doctor-register-label">Address</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="address"
                                    id="address"
                                    className="doctor-register-input"
                                    placeholder="Address"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="mobile" className="doctor-register-label">Mobile</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="mobile"
                                    id="mobile"
                                    className="doctor-register-input"
                                    placeholder="Mobile"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="registration_no" className="doctor-register-label">Registration No.</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="registration_no"
                                    id="registration_no"
                                    className="doctor-register-input"
                                    placeholder="Registration No."
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="year_of_registration" className="doctor-register-label">Year of Registration</label>
                                <input
                                    type="date"
                                    onChange={handleChange}
                                    name="year_of_registration"
                                    id="year_of_registration"
                                    className="doctor-register-input"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="qualification" className="doctor-register-label">Qualification</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="qualification"
                                    id="qualification"
                                    className="doctor-register-input"
                                    placeholder="Qualification"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="State_Medical_Council" className="doctor-register-label">State Medical Council</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="State_Medical_Council"
                                    id="State_Medical_Council"
                                    className="doctor-register-input"
                                    placeholder="State Medical Council"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="specialization" className="doctor-register-label">Specialization</label>
                                <select
                                    id="specialization"
                                    className="doctor-register-input"
                                    name="specialization"
                                    onChange={handleChange}
                                >
                                    <option selected>Choose Specialization</option>
                                    {specializations.map((specialization, idx) => (
                                        <option key={idx} value={specialization.value}>{specialization.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="password" className="doctor-register-label">Password</label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="doctor-register-input"
                                    required=""
                                />
                            </div>
                            <div className="md:col-span-1 col-span-2">
                                <label htmlFor="password1" className="doctor-register-label">Confirm Password</label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    name="password1"
                                    id="password1"
                                    placeholder="••••••••"
                                    className="doctor-register-input"
                                    required=""
                                />
                            </div>
                        </div>
                        <button type="submit" className="doctor-register-button">
                            Register
                        </button>
                        <p className="doctor-register-footer">
                            Already have an account? Login as <Link to="/login/doctor/" className="doctor-register-link">Doctor</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default DoctorRegister;
