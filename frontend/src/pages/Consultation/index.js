import useApiHelper from '../../api';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { REACT_PUBLIC_APP_API_URL } from '../../interceptors';
import ReviewRating from '../../Components/Modal/Rating';
import '../../styles/consultingPage.css'; // Linking segregated CSS file

const Consultation = () => {
    const [consultation, setConsultation] = useState({});
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const api = useApiHelper();

    const handleClose = () => {
        setOpen(false);
    };

    const getFileNameFromUrl = (url) => {
        const extension = url.split('.').pop().split(/\#|\?/)[0];
        return `report.${extension}`;
    };

    const downloadFile = async (filePath) => {
        try {
            const fileUrl = `${REACT_PUBLIC_APP_API_URL}${filePath}`;
            const response = await fetch(fileUrl);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = getFileNameFromUrl(fileUrl);
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("File download failed:", error);
        }
    };

    useEffect(() => {
        api.consultationDetails(id).then(res => {
            setConsultation(res?.consultation);
        }).catch(error => {
            console.log(error)
        });
    }, [id, api]);

    return (
        <div className='consultation-container max-w-screen-xl mx-auto px-4 mt-10'>
            <div className='consultation-grid grid grid-cols-2 gap-5'>
                <div className='consultation-details col-span-1 bg-gray-50 p-5 rounded-lg'>
                    <h5 className="consultation-title text-xl font-medium mb-5">Predicted Disease: {consultation?.diseaseinfo?.diseasename}</h5>
                    <div>
                        <div className='consultation-symptoms mb-8'>
                            <p className="consultation-label text-lg text-gray-900 mb-3">List of symptoms</p>
                            <ul className="symptoms-list max-w-md space-y-1 text-gray-500 list-disc list-inside">
                                {consultation?.diseaseinfo?.symptomsname?.length > 0 && consultation?.diseaseinfo?.symptomsname?.map((symptom, idx) => (
                                    <li key={idx} className="symptom-item">{symptom}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='confidence-score-section mb-8'>
                            <p className="consultation-label text-lg text-gray-900 mb-3">Confidence score</p>
                            <div className="confidence-bar w-1/2 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="confidence-fill bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded" style={{ width: `${consultation?.diseaseinfo?.confidence}%` }}>
                                    {consultation?.diseaseinfo?.confidence}%
                                </div>
                            </div>
                        </div>
                        <div className='consultation-date mb-8'>
                            <p className="consultation-label text-lg text-gray-900 mb-1">Consultation Date</p>
                            <span className='consultation-date-text text-gray-500'>{consultation?.consultation_date}</span>
                        </div>
                        <div className='consultation-status mb-8'>
                            <p className="consultation-label text-lg text-gray-900 mb-1">Consultation Status</p>
                            <span className='status-text text-green-700 font-bold'>{consultation?.status}</span>
                        </div>
                            <div className='consultation-actions flex gap-3 items-center mt-10 justify-center'>
                                {consultation?.report && (
                                    <button onClick={() => downloadFile(consultation?.report)} type="button" className="download-button">
                                        Download Report
                                    </button>
                                )}
                                <button onClick={() => setOpen(true)} type="button" className="rating-button">Rating</button>
                                <button type="button" className="cancel-button">Cancel</button>
                            </div>

                    </div>
                </div>
                <div className="chatbot-section col-span-1 w-full">
                    <div className="chatbot-box bg-white shadow-md rounded-lg">
                        <div className="chatbot-header p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                            <p className="chatbot-title text-lg font-semibold">Chat Bot</p>
                        </div>
                        <div className="chatbot-messages p-4 h-[450px] overflow-y-auto">
                            <div className="message-right mb-2 text-right">
                                <p className="chatbot-message bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">hello</p>
                            </div>
                            <div className="message-left mb-2">
                                <p className="chatbot-message bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
                            </div>
                            {/* Add more messages as needed */}
                        </div>
                        <div className="chatbot-input-section p-4 border-t flex">
                            <input type="text" placeholder="Type a message" className="chatbot-input w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button className="send-button bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewRating open={open} closeModal={handleClose} consultationId={id} />
        </div>
    );
};

export default Consultation;
