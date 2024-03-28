import { Route, Navigate } from 'react-router-dom';

const AuthCheck = () => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');

    // If token exists, allow navigation, otherwise redirect to login
    return token ? (
        null
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default AuthCheck;