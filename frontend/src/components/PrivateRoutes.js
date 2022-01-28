import React from 'react';
import {Navigate} from "react-router-dom"

const PrivateRoutes = ({children}) => {
     const authentification = localStorage.getItem("autorisationToken");

     return (authentification ? children : <Navigate to={"/login"}></Navigate> )
    
};

export default PrivateRoutes;