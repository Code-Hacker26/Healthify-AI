import useInterCeptor from './interceptors';

const useApiHelper = () => {
    const axios = useInterCeptor();

    const api = {
        //auth
        patientLogin: (data, params = {}) => axios.post(`accounts/sign-in-patient/`, data, { params: params }),
        doctorLogin: (data, params = {}) => axios.post(`accounts/sign-in-doctor/`, data, { params: params }),
        patientRegister: (data, params = {}) => axios.post(`accounts/signup-patient/`, data, { params: params }),
        doctorRegister: (data, params = {}) => axios.post(`accounts/signup-doctor/`, data, { params: params }),
        logout: (data, params = {}) => axios.post(`accounts/logout/`, data, { params: params }),
        userDetails: (params = {}) => axios.get(`accounts/user-details/`, { params: params }),

        predictDisease: (data, params = {}) => axios.post(`check-disease/`, data, { params: params }),
        doctorList: (params = {}) => axios.get(`doctor-list/`, { params: params }),
        makeConsultation: (doctor_id, data, params = {}) => axios.post(`consult/make/${doctor_id}/`, data, { params: params }),
        consultationDetails: (consultation_id, params = {}) => axios.get(`consultation/${consultation_id}/`, { params: params }),
        patientDetails: (id, params = {}) => axios.get(`patient/${id}/`, { params: params }),
        doctorDetails: (id, params = {}) => axios.get(`doctor/${id}/`, { params: params }),
        patientConsultation: (params = {}) => axios.get(`patient/consultation/`, { params: params }),
        doctorConsultation: (params = {}) => axios.get(`doctor/consultation/`, { params: params }),
        rateReview: (id, data, params = {}) => axios.post(`consultation/${id}/rate-review/`, data, { params: params }),

    }
    return api;
}

export default useApiHelper