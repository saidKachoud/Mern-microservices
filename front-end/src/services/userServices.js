const user_micro_services = import.meta.env.VITE_USER_SERVER

export const postDataLogin = async (token,data) =>{
    const response = await axios.post(`${user_micro_services}/login`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
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

// FOR AYOUB: use this sevice to make calls to user server (LOGIN, REGISTER)