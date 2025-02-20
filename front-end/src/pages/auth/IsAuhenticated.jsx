import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const IsAuthenticated = () =>{
    const token = localStorage.getItem('token');
    const isAuth = token ? true : false;

    return (
        isAuth ? <Outlet /> : <Navigate to={'/'} />
    )
} 