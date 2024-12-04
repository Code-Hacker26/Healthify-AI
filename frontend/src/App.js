import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';

import RootLayout from './Components/RootLayout';
import DoctorLogin from './pages/Login/DoctorLogin';
import DoctorRegister from './pages/Register/DoctorRegister';
import PatientLogin from './pages/Login/PatientLogin';
import PatientRegister from './pages/Register/PatientRegister';
import DoctorProfile from './pages/Profile/DoctorProfile';
import PatientProfile from './pages/Profile/SpareProfile';
import Predict from './pages/Predict';
import Doctors from './pages/Doctors';
import Consultation from './pages/Consultation/index';
import PatientConsultationHistory from './pages/Consultation/PatientHistory';
import DoctorConsultationHistory from './pages/Consultation/DoctorHistory';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About/>} />
          <Route path='/login/doctor' element={<DoctorLogin />} />
          <Route path='/login/patient' element={<PatientLogin />} />
          <Route path='/register/doctor' element={<DoctorRegister />} />
          <Route path='/register/patient' element={<PatientRegister />} />
          <Route path='/profile/doctor/:id' element={<DoctorProfile />} />
          <Route path='/profile/patient/:id' element={<PatientProfile />} />
          <Route path='/predict' element={<Predict />} /> 
          <Route path='/doctors/:id' element={<Doctors />} />
          <Route path='/consultation/:id' element={<Consultation />} />
          <Route path='/consultation/history/patient' element={<PatientConsultationHistory />} />
          <Route path='/consultation/history/doctor' element={<DoctorConsultationHistory />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
