import axios from 'axios';
import Cookies from 'js-cookie';

export const REACT_PUBLIC_APP_API_URL = process.env.REACT_PUBLIC_API_URL || "http://127.0.0.1:8000/"

export const deleteAllCookies = () => {
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
}

const useInterCeptor = () => {


    const instance = axios.create({
        baseURL: REACT_PUBLIC_APP_API_URL,
        timeout: 10000,
    });

    instance.defaults.timeout = 10000;
    // instance.defaults.headers.common['Content-Type'] = 'application/json';
    instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    instance.defaults.headers.common['Accept'] = 'application/json';


    instance.interceptors.request.use(
        config => {
            const authToken = Cookies.get('accessToken');
            if (authToken) {
                //config.headers['Authorization'] =  "token "+authToken; // for general token wize
                config.headers['Authorization'] = "Bearer " + authToken;
            }
            return config
        },
        error => {
            Promise.reject(error)
        }
    )


    instance.interceptors.response.use(
        response => {
            return response.data
        },
        error => {
            return Promise.reject(error)
        }
    );

    return (instance);

}

export default useInterCeptor;