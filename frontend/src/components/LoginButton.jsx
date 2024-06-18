import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function RedirectHome() {
    const navigate = useNavigate();
    return <Navigate to="/dashboard" />
}

export default RedirectHome;