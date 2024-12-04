import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SearchSymptoms from "../Components/Modal/SearchSymptoms";
import useApiHelper from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/predict.css"; 
import Footer from './hospitalfooter.js'


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

function getSpecializationByCondition(condition) {
  for (let specialization in doctorSpecializations) {
    if (doctorSpecializations[specialization].includes(condition)) {
      return specialization;
    }
  }
  return null;
}

export default function Predict() {
  const [open, setOpen] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState({});
  const navigate = useNavigate();
  const api = useApiHelper();

  useEffect(() => {
    if (!Cookies.get('accessToken')) {
      navigate('/');
    }
  }, []);

  const handlePredictDisease = () => {
    api.predictDisease({ symptoms }).then((res) => {
      setResult(res);
    }).catch(error => {
      console.log(error);
    });
  };

  return (
    <section className="predict-section">
      <div className="content-wrapper">
        <h3 className="title" style={{color:'black'}}>Identify possible conditions and treatment related to your symptoms.</h3>

        <div className="symptom-grid">
          <div className="symptom-column">
            <div className="add-symptoms-btn">
              <button onClick={() => setOpen(true)}>Add Symptoms</button>
            </div>
            {Object.keys(result).length > 0 ? (
              <div className="result-box">
                <h5>{result?.patient?.name}</h5>
                <p><b>Age:</b> {result?.patient?.age}</p>
                <p><b>Predicted Disease:</b> {result?.predicteddisease}</p>
                <p><b>Confidence score:</b></p>
                <div className="confidence-bar">
                  <div style={{ width: `${result?.confidencescore}%` }}>{result?.confidencescore}%</div>
                </div>
                <Link to={`/doctors/${result?.disease_info}/?disease=${getSpecializationByCondition(result?.predicteddisease)}`}>
                  Consult a {getSpecializationByCondition(result?.predicteddisease)} specialist
                </Link>
              </div>
            ) : (
              <div className="no-result-box">
                {symptoms.length > 0 ? 'Press predict button to predict disease' : 'Add symptoms to predict disease'}
              </div>
            )}
          </div>

          <div className="selected-symptoms-column">
            {symptoms.length > 0 && (
              <div className="symptom-tags">
                {symptoms.map((symptom, idx) => (
                  <span className="symptom-tag" key={idx}>{symptom}</span>
                ))}
              </div>
            )}
            {symptoms.length > 0 && (
              <div className="predict-btn-wrapper">
                <button onClick={handlePredictDisease}>Predict</button>
              </div>
            )}
          </div>
        </div>

        <SearchSymptoms open={open} closeModal={() => setOpen(false)} setSymptoms={setSymptoms} />
      </div>
    </section>
  );
}
