import axios from "axios";
const product_micro_services = import.meta.env.VITE_PRODUCT_SERVER;

export const getProducts = async (token) =>{
    const response = await axios.get(`${product_micro_services}/getProducts`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const getMyProducts = async (token) =>{
    const response = await axios.get(`${product_micro_services}/getMyProducts`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const postProduct = async (token,data) =>{
    const response = await axios.post(`${product_micro_services}/addProduct`,data,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}

export const deleteProduct = async (token,productId) =>{
    const response = await axios.delete(`${product_micro_services}/deleteProduct/${productId}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    return response;
}