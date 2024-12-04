"use client";

import React, { useState } from 'react';
import { Modal } from "flowbite-react";
import { useParams, useNavigate } from 'react-router-dom';
import useApiHelper from '../../api';
import '../../styles/ConsultDoctor.css'; // Importing the custom CSS file

const ConsultDoctor = ({ open, closeModal, doctorId }) => {
    const [date, setDate] = useState();
    const [report, setReport] = useState(null);
    const api = useApiHelper();
    const navigate = useNavigate();
    const { id } = useParams();

    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const handleConsult = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('consultation_date', date);
        formData.append('disease_info', id);
        formData.append('report', report);

        api.makeConsultation(doctorId, formData).then(res => {
            navigate(`/consultation/${res?.consultation_id}`)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Modal show={open} size="md" onClose={closeModal} popup style={{ marginTop: '70px' }} className="modal-with-bg">
            <Modal.Header />
            <Modal.Body>
                <form onSubmit={handleConsult} method='post'>
                    <h4 className="modal-title">Consult a Doctor</h4>
                    <div className='mb-5'>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Choose a date
                        </label>
                        <input
                            type="date"
                            onChange={(e) => setDate(e.target.value)}
                            name="date"
                            className='date-input'
                            required
                            id="date"
                            min={today} // Restrict date selection to today and future dates
                        />
                    </div>
                    <div className='mb-5'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="report">
                            Report
                        </label>
                        <input
                            onChange={(e) => setReport(e.target.files[0])}
                            className="file-input"
                            name="report"
                            id="report"
                            type="file"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Next
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default ConsultDoctor;
