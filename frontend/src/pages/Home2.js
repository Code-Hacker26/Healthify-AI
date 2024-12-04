import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

const Home = () => {
    const gContext = useContext(GlobalContext);


    return (
        <section style={{
            backgroundImage: `url('/bg/bg.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            boxShadow: 'inset 0 0 0 2000px rgba(20, 0, 0, 0.4)',
            height: 'calc(100vh - 110px)'
        }} className="">
            <div style={{ height: 'inherit' }} className="px-4 max-w-screen-xl mx-auto flex items-center">
                <div className="max-w-2xl">
                    <div className='mb-10 '>
                        <h1 className="text-4xl mb-2 text-white font-extrabold tracking-tight leading-none text-2xl">
                            Be your own Doctor
                        </h1>
                        <div className='h-2 w-44 bg-white'></div>
                    </div>
                    <p className="mb-6 text-white lg:mb-8 text-base">
                        It might have happened so many times that you or someone yours need doctor’s help immediately, but they are not available due to some reasons. The Disease Prediction system is an end user support and online consultation project. Here, we propose a web application that allows users to get instant guidance on their disease through an intelligent system. The application is fed with various details and the disease associated with those details. The application allows users to share their disease-related issues; it then processes user-specific details to check for various illness that could be associated with it. Here we use some intelligent data mining techniques to guess the most accurate illness that could be associated with patients' details. Based on result, patient can contact doctor accordingly for further treatment.
                    </p>
                    {gContext?.isLoggedIn ? (
                        <>
                            {gContext?.user?.is_patient &&
                                <Link to={`/profile/patient/${gContext?.user?.patient?.pk}`}
                                    className="inline-flex justify-center items-center py-3 px-7 text-sm font-bold text-center text-white border border-blue-700 rounded-xl uppercase bg-blue-700">
                                    Get started
                                </Link>}
                            {gContext?.user?.is_doctor &&
                                <Link to={`/profile/doctor/${gContext?.user?.doctor?.pk}`}
                                    className="inline-flex justify-center items-center py-3 px-7 text-sm font-bold text-center text-white border border-blue-700 rounded-xl uppercase bg-blue-700">
                                    Get started
                                </Link>}
                        </>
                    ) : (
                        <>
                            <Link to="/login/doctor/"
                                className="inline-flex justify-center items-center py-3 px-7 text-sm font-bold text-center text-white border border-blue-700 rounded-xl uppercase bg-blue-700 mr-3">
                                Login as Doctor
                            </Link>
                            <Link to="/login/patient/"
                                className="inline-flex justify-center items-center py-3 px-7 text-sm font-bold text-center text-white border border-blue-700 rounded-xl uppercase bg-blue-700">
                                Login as Patient
                            </Link>
                        </>)}
                </div>
                <div></div>
            </div>
        </section>
    )
}

export default Home