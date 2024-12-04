import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApiHelper from '../../api';
import '../../styles/doctorHistory.css';  // Import the CSS file

const DoctorConsultationHistory = () => {
    const [consultations, setConsultations] = useState([]);
    const api = useApiHelper();

    useEffect(() => {
        api.doctorConsultation().then(res => {
            setConsultations(res);
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <section className="doctor-consultation-section">
            <div className="consultation-container">
                <h3 className="title">Consultation History</h3>

                <div className="table-wrapper">
                    <table className="consultation-table">
                        <thead className="table-head">
                            <tr>
                                <th>Patient Name</th>
                                <th>Patient Email</th>
                                <th>Patient Profile</th>
                                <th>Disease Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Resume Consultation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consultations?.length > 0 && consultations?.map((consultation) => (
                                <tr key={consultation?.pk} className="table-row">
                                    <td>{consultation?.patient?.name}</td>
                                    <td>{consultation?.patient?.user?.email}</td>
                                    <td>
                                        <Link className="view-link" to={`/profile/patient/${consultation?.patient?.pk}`}>View</Link>
                                    </td>
                                    <td>{consultation?.diseaseinfo?.diseasename}</td>
                                    <td>{consultation?.consultation_date}</td>
                                    <td>{consultation?.status}</td>
                                    <td>
                                        <Link className="resume-link" to={`/consultation/${consultation?.pk}`}>Resume</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!consultations?.length > 0 &&
                    <div className="no-consultations">
                        <p>No consultation history found</p>
                    </div>}
            </div>
        </section>
    )
}

export default DoctorConsultationHistory;
