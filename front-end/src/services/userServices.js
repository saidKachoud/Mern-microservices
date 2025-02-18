import axios from "axios";
const user_micro_services = import.meta.env.VITE_USER_SERVER

export const postDataLogin = async (data) =>{
    const response = await axios.post(`${user_micro_services}/login`,data);
    return response;
}

export const postDataRegister = async (token,data) =>{
    const response = await axios.post(`${user_micro_services}/register`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const logout = async (token) =>{
    const response = await axios.post(`${user_micro_services}/logout`,null,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}