import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApiHelper from '../../api';
import '../../styles/PatientHistory.css';

const PatientConsultationHistory = () => {
    const [consultations, setConsultations] = useState([]);
    const api = useApiHelper();

    useEffect(() => {
        api.patientConsultation().then(res => {
            setConsultations(res);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <section className="patient-consultation-section">
            <div className="consultation-table-container">
                <h3 className="text-3xl font-medium text-center text-white mb-16">Consultation History</h3>

                <div className="relative overflow-x-auto">
                    <table className="consultation-table">
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>Doctor Email</th>
                                <th>Doctor Profile</th>
                                <th>Disease Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Resume Consultation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultations?.length > 0 && consultations?.map((consultation) => (
                                <tr key={consultation?.pk}>
                                    <td style={{ color: 'black' }}>{consultation?.doctor?.name}</td>
                                    <td style={{ color: 'black' }}>{consultation?.doctor?.user?.email}</td>
                                    <td style={{ color: 'black' }}>
                                        <Link to={`/profile/doctor/${consultation?.doctor?.pk}`}>
                                            <button className="view-btn">View</button>
                                        </Link>
                                    </td>
                                    <td style={{ color: 'black' }}>{consultation?.diseaseinfo?.diseasename}</td>
                                    <td style={{ color: 'black' }}>{consultation?.consultation_date}</td>
                                    <td style={{ color: 'black' }}>{consultation?.status}</td>
                                    <td>
                                        <Link to={`/consultation/${consultation?.pk}`}>
                                            <button className="resume-btn">Resume</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!consultations?.length > 0 && (
                    <div className="no-consultations">
                        <p>No consultation history found</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PatientConsultationHistory;
