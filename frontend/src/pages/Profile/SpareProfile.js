import React, { useState, useEffect, useContext } from "react";
import '../../styles/SpareProfile.css';
import useApiHelper from '../../api';
import GlobalContext from '../../context/GlobalContext';
import { Link, useParams } from 'react-router-dom';

const PatientProfile = () => {
    const [patient, setPatient] = useState(null); // Initialize state properly
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
        <div className="container rounded bg-white mt-5 mb-5" >
    <div className="row">
                <div className="col-md-3 border-right" >
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5" style={{ backgroundColor: '#E7F3F8' ,marginTop: '70px',border: '2px solid black'  }}>
                        <img
                            className="rounded-circle mt-5"
                            width="150px"
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            alt="profile"
                        />
                        <span className="font-weight-bold">{patient?.user?.username}</span>
                        <span className="text-black-50">{patient?.user?.email}</span>
                    </div>
                </div>
                <div className="col-md-8 border-right" style={{ backgroundColor: '#E7F3F8',marginTop: '70px',border: '3px solid black'  }}>

                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="profile-title text-center">Profile : </h4>

                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">Name : </label>
                                <span className="font-weight-bold"> {patient?.name}</span>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Mobile Number : </label>
                                <span className="font-weight-bold"> {patient?.mobile_no}</span>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Address : </label>
                                <span className="font-weight-bold"> {patient?.address}</span>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Gender : </label>
                                <span className="font-weight-bold"> {patient?.gender}</span>
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            {gContext?.user?.pk === patient?.user?.pk && (
                                <div className="action-buttons">
                                    <button className="btn check-disease-button">
                                        <Link to="/predict" className="action-link">Check Disease</Link>
                                    </button>
                                    <button className="btn history-button">
                                        <Link to="/consultation/history/patient" className="history-link">Consultation History</Link>
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientProfile;
