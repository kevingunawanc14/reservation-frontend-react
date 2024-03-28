import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const useAuthChecker = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Concise check for truthy value (token exists)

        // Redirect if token is null or undefined on initial render
        if (!token) {
            navigate('/login'); // Replace '/login' with your actual login path
        }
    }, []); // Empty dependency array to run only on initial render

    return isLoggedIn;
};

export default useAuthChecker;