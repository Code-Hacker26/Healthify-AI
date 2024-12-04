import useApiHelper from '../api';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ConsultDoctor from '../Components/Modal/ConsultDoctor';
import '../styles/doctors.css'; // Import the updated CSS file


const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [open, setOpen] = useState(false);
    const [doctorId, setDoctorId] = useState(null);

    const api = useApiHelper();
    const [searchParams] = useSearchParams();
    const disease = searchParams.get('disease');

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = (doctor_id) => {
        setDoctorId(doctor_id);
        setOpen(true);
    }

    useEffect(() => {
        api.doctorList({ 'specialization': disease }).then(res => {
            setDoctors(res);
        }).catch(error => {
            console.log(error);
        });
    }, [disease]);

    return (
        <section className="doctor-section-background overflow-x-hidden overflow-y-scroll">
            <div className='doctor-table-container'>
                <h3 className="doctor-title-text">Consult a Doctor</h3>
                <div className="relative overflow-x-auto">
                    <table className="doctor-table">
                        <thead className="doctor-table-head">
                        <tr>
                            <th className="px-6 py-3" style={{ color: 'black' }}>Doctor Name</th>
                            <th className="px-6 py-3" style={{ color: 'black' }}>Specialization</th>
                            <th className="px-6 py-3" style={{ color: 'black' }}>Email</th>
                            <th className="px-6 py-3" style={{ color: 'black' }}>Ratings</th>
                            <th className="px-6 py-3" style={{ color: 'black' }}>View Profile</th>
                            <th className="px-6 py-3" style={{ color: 'black' }}>Consult</th>
                            </tr>

                        </thead>
                        <tbody>
                            {doctors.length > 0 && doctors.map((doctor) => (
                                <tr key={doctor?.pk} className="doctor-table-body">
                                    <td className="px-6 py-3">{doctor?.name}</td>
                                    <td className="px-6 py-3">{doctor?.specialization}</td>
                                    <td className="px-6 py-3">{doctor?.user?.email}</td>
                                    <td className="px-6 py-3">{doctor?.rating}</td>
                                    <td className="px-6 py-3">
                                        <Link to={`/profile/doctor/${doctor?.pk}`} className='doctor-underline-link'>View Profile</Link>
                                    </td>
                                    <td className="px-6 py-3">
                                        <button onClick={() => handleOpen(doctor?.pk)} className='doctor-consult-button'>
                                            Consult
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!doctors.length && (
                    <div className="doctor-no-doctors-message">
                        <p>No doctors found</p>
                    </div>
                )}
            </div>
            <ConsultDoctor
                open={open}
                closeModal={handleClose}
                doctorId={doctorId}
            />
        </section>
    );
};

export default Doctors;
