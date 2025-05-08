import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ allowedRoles, children }) {
    const storedUser = localStorage.getItem('user');

    /*console.log(storedUser)*/

    if (!storedUser) {
        return <Navigate to="/Login" replace />;
        
    }

    try {
        const user = JSON.parse(storedUser);
        const userRole = user.rol; 
        

        if (!userRole) {
            return <Navigate to="/" replace />;
        }

        if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
            return <Navigate to="/" replace />;
            
            
        }

        return children ? children : <Outlet />;

    } catch (error) {
        console.error("Error al parsear la información del usuario:", error);
        return <Navigate to="/Login" replace />;
    }
}

export default ProtectedRoute;