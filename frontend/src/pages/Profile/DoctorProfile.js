import React, { useContext, useEffect, useState } from 'react';
import useApiHelper from '../../api';
import GlobalContext from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import '../../styles/doctorProfile.css';

const doctorSpecializations = {
    // same specializations object
};

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState();
    const api = useApiHelper();
    const { id } = useParams();
    const gContext = useContext(GlobalContext);

    useEffect(() => {
        api.doctorDetails(id).then(res => {
            setDoctor(res);
        }).catch(error => {
            console.log(error)
        });
    }, [api, id]);

    return (
        <section className="doctor-profile">
            <div className="profile-container">
                <div className="col-span-2">
                    <div className="profile-card">
                        <img className="avatar" src="https://cdn.pixabay.com/photo/2016/03/31/20/12/doctor-1295581_1280.png" alt="Doctor avatar" />
                        <h6 className="profile-header">{doctor?.name}</h6>
                        <div className="profile-detail">
                            {/* SVG icon */}
                            <p>{doctor?.specialization}</p>
                        </div>
                        <div className="profile-detail">
                            {/* SVG icon */}
                            <p>{doctor?.address}</p>
                        </div>
                        <div className="mb-5">
                            <p className="profile-detail">Email address</p>
                            <p>{doctor?.user?.email}</p>
                        </div>
                        <div>
                            <p className="profile-detail">Phone number</p>
                            <p>{doctor?.mobile_no}</p>
                        </div>
                        {gContext?.user?.pk === doctor?.user?.pk && (
                            <div className="flex mt-4 md:mt-6">
                                <Link to="/consultation/history/doctor" className="py-2 px-4 text-sm font-medium text-white focus:outline-none bg-transparent rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                                    Consultation History
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="profile-card">
                        <h3 className="general-info-header">Specialist</h3>
                        <div className="specializations">
                            {doctorSpecializations[doctor?.specialization]?.map((item, idx) => (
                                <a key={idx} href="#" className="specialization-tag">{item}</a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-span-4">
                    <div className="profile-card">
                        <h3 className="general-info-header">General information</h3>
                        <p className="general-info">{doctor?.about_me || "Nothing about Doctor"}</p>
                        <div className="general-info-grid">
                            <div className="general-info-item">
                                <p className="general-info">State Medical Council</p>
                                <p className="general-info">{doctor?.State_Medical_Council}</p>
                            </div>
                            <div className="general-info-item">
                                <p className="general-info">Qualification</p>
                                <p className="general-info">{doctor?.qualification}</p>
                            </div>
                            {/* Other items */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorProfile;
