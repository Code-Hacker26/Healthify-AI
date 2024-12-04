import React, { useState, useEffect, useContext } from "react";
import '../../styles/SpareProfile.css';
import useApiHelper from '../../api';
import GlobalContext from '../../context/GlobalContext';
import { Link, useParams } from 'react-router-dom';

const doctorSpecializations = {
    'Rheumatologist': ['Osteoarthristis', 'Arthritis'],
    'Cardiologist': ['Heart attack', 'Bronchial Asthma', 'Hypertension '],
    'ENT specialist': ['(vertigo) Paroymsal Positional Vertigo', 'Hypothyroidism'],
    'Neurologist': ['Varicose veins', 'Paralysis (brain hemorrhage)', 'Migraine', 'Cervical spondylosis'],
    'Allergist/Immunologist': ['Allergy', 'Pneumonia', 'AIDS', 'Common Cold', 'Tuberculosis', 'Malaria', 'Dengue', 'Typhoid'],
    'Urologist': ['Urinary tract infection', 'Dimorphic hemmorhoids(piles)'],
    'Dermatologist': ['Acne', 'Chicken pox', 'Fungal infection', 'Psoriasis', 'Impetigo'],
    'Gastroenterologist': ['Peptic ulcer diseae', 'GERD', 'Chronic cholestasis', 'Drug Reaction', 'Gastroenteritis',
        'Hepatitis E', 'Alcoholic hepatitis', 'Jaundice', 'hepatitis A', 'Hepatitis B',
        'Hepatitis C', 'Hepatitis D', 'Diabetes ', 'Hypoglycemia']
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
                        <span className="font-weight-bold">{doctor?.user?.username}</span>
                        <span className="text-black-50">{doctor?.user?.email}</span>
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
                                <span className="font-weight-bold"> {doctor?.name}</span>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Mobile Number : </label>
                                <span className="font-weight-bold"> {doctor?.mobile_no}</span>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Address : </label>
                                <span className="font-weight-bold"> {doctor?.address}</span>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Gender : </label>
                                <span className="font-weight-bold"> {doctor?.gender}</span>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Specialization : </label>
                                <span className="font-weight-bold"> {doctor?.specialization}</span>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Consulting Fees : </label>
                                <span className="font-weight-bold"> {doctor?.specialization}</span>
                            </div>

                            <div className="col-md-12">
                                <label className="labels">Qualification : </label>
                                <span className="font-weight-bold"> {doctor?.qualification}</span>
                            </div>
                            
                        </div>
                        

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientProfile;
