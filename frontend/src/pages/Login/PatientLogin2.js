import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useApiHelper from '../../api';
import Cookies from 'js-cookie';
import GlobalContext from '../../context/GlobalContext';

const PatientLogin = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const api = useApiHelper();
    const gContext = useContext(GlobalContext);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        api.patientLogin(formData).then(res => {
            Cookies.set('accessToken', res?.token?.access);
            gContext.setIsLoggedIn(true);
            gContext.setUser(res?.token?.user);
            navigate('/');
        }).catch(error => {
            setError(error?.response?.data?.error);
        })
    }

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            navigate('/')
        }
    }, [])

    return (
        <section style={{
            backgroundImage: `url('/bg/bg.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)',
            height: '100vh'
        }} className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                </Link>
                <div style={{
                    boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.1) -6px -2px 16px 0px',
                }} className="w-full bg-transparent rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                            Sign in as a Patient
                        </h1>
                        {error &&
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                {error}
                            </div>}
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    name="username"
                                    id="username"
                                    className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
                                    placeholder="Username"
                                    required=""
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-transparent border border-gray-300 text-white rounded-lg block w-full p-2.5"
                                    required=""
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-white">Remember me</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                            <p className="text-sm font-light text-white">
                                Don’t have an account? Register as <Link to="/register/patient/" className="font-medium text-white underline">Patient</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PatientLogin