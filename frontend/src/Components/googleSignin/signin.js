import React, { useState, useEffect } from "react";
import { auth, provider } from './config';
import { signInWithPopup } from "firebase/auth";
import Home from './Home';

function SignIn() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleClick = () => {
        signInWithPopup(auth, provider).then((data) => {
            // Get email and display name from the signed-in user
            setEmail(data.user.email);
            setName(data.user.displayName);

            // Store email and name in localStorage
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("name", data.user.displayName);
        });
    };

    useEffect(() => {
        // Retrieve email and name from localStorage if available
        setEmail(localStorage.getItem('email'));
        setName(localStorage.getItem('name'));
    }, []);

    return (
        <div>
            {email ? (
                <Home />
            ) : (
                <button onClick={handleClick}>
                    Sign in With Google
                </button>
            )}
            {email && <p>Email: {email}</p>}
            {name && <p>Name: {name}</p>}
        </div>
    );
}

export default SignIn;
