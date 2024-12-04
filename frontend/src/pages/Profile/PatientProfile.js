import React, { useContext, useEffect, useState } from 'react';
import useApiHelper from '../../api';
import GlobalContext from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../styles/profile/profile.css'; // Import the CSS file
import Section from '../../Components/Section';
import Footer from '../hospitalfooter.js'


const PatientProfile = () => {
    const [patient, setPatient] = useState();
    const api = useApiHelper();
    const { id } = useParams();
    const gContext = useContext(GlobalContext);

    useEffect(() => {
        api.patientDetails(id).then(res => {
            setPatient(res);
        }).catch(error => {
            console.log(error);
        });
    }, [id, api]);

    return (
        

<section className='patient-profile-section'>
            <div className="profile-container">
                <div className="col-span-2">
                    <div className="profile-card">
                        <img className="profile-image" src="https://cdn.pixabay.com/photo/2016/03/31/20/11/patient-1295570_1280.png" alt="Large avatar" />
                        <h6 className="profile-name">{patient?.name}</h6>
                        <div className="profile-details">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd" />
                                </svg>
                                <p>{patient?.address}</p>
                            </div>
                        </div>

                        <div className='profile-details'>
                            <p>Email address</p>
                            <p>{patient?.user?.email}</p>
                        </div>
                        <div className='profile-details'>
                            <p>Phone number</p>
                            <p>{patient?.mobile_no}</p>
                        </div>
                        {gContext?.user?.pk === patient?.user?.pk &&
                            <div className="action-links">
                                <Link to="/predict" className="action-link">Check Disease</Link>
                                <Link to="/consultation/history/patient" className="history-link">Consultation History</Link>
                            </div>
                        }
                    </div>
                </div>

                <div className="col-span-4">
                    <div className="general-info">
                        <div className="flex items-center justify-between mb-1">
                            <h3>General information</h3>
                        </div>
                        <div>
                            <span>
                                {patient?.about_me ? patient?.about_me : "Nothing about Patient"}
                            </span>

                            <div className="info-grid">
                                <div className="info-item">
                                    <p>Date of Birth</p>
                                    <p>{patient?.dob}</p>
                                </div>
                                <div className="info-item">
                                    <p>Gender</p>
                                    <p>{patient?.gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        
    );
}

export default PatientProfile;
