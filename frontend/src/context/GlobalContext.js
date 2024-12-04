import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useApiHelper from "../api";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState({});
    const api = useApiHelper();

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    })

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            api.userDetails().then(res => {
                setUser(res?.token?.user)
            })
        }
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
export { GlobalProvider };