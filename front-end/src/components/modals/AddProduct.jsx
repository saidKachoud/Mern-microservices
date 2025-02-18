import { useState } from "react";
import { Button } from "../UI/Button";
import { Notification } from "../UI/Notification";
import { Label } from "../UI/Label";
import { Input } from "../UI/Input";
import React from "react";
import { postProduct } from "../../services/productServices";

export const AddProduct = ({ setOpen }) => {

  const [notification,setNotification] = useState({});
  const [loading,setLoading] = useState(false);
  const [productData,setProductData] = useState({
    name : '',
    description : '',
    price : null,
  })
  const [productImage,setProductImage] = useState(null);
  
  const handleChangeImage = (e) =>{
    setProductImage(e.target.files[0]);    
  }
  
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setProductData((prevData) =>({
      ...prevData,
      [name] : value
    }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setNotification(null);
    setLoading(true);
    const data = new FormData();
    data.append("name",productData.name);
    data.append("description",productData.description);
    data.append("price",productData.price);
    data.append("image",productImage);

    try{
        const response = await postProduct(localStorage.getItem('token'),data);
        setLoading(false);
        if(response.status === 200){
            setNotification({type:"success",message:response.data.message});
        }
        setProductData({
            name : '',
            description : '',
            price : null
        });

        setTimeout(() => {
            setOpen(false);
        }, 3000);

    }catch(error){
        setLoading(false);
        if(error.response){
            setNotification({type:"error",message:"Try again later"})
        }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-opacity-50 backdrop-blur-md">
          <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                Post a product
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Fill this inputs to add new product
              </p>
            </div>

            <div>
              <Label text={'Product name'} />
              <Input type={'text'}
                name={'name'}
                text={'black'}
                placholder={'Ex: bijjo talpiwit'}
                value={productData.name}
                onChange={handleChange}
                />
            </div>
            <div>
              <Label text={'Product description'} />
              <textarea name="description" 
              value={productData.description}
              onChange={handleChange}
              placeholder="This product is not beautiful"
              className="w-[100%] resize-none h-32 px-2 py-1 outline-none border border-black"></textarea>
            </div>
            <div>
              <Label text={'Product price'} />
              <Input type={'number'}
                name={'price'}
                text={'black'}
                placholder={'Ex: 20000'}
                value={productData.price}
                onChange={handleChange}
                />
            </div>
            <div>
              <Label text={'Product Image'} />
              <br></br>
              <input type="file" onChange={handleChangeImage} className="border border-gray-600 w-[100%] rounded-sm py-1 px-3 text-black" />
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                text="Cancel"
                onClick={() => setOpen(false)}
                bg="bg-gray-200"
                color="gray-900"
              />
              <Button
                type="submit"
                text={"Post product"}
                loading={loading}
                bg="bg-blue-600"
              />
            </div>
          </div>
          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
            />
          )}
        </div>
      </form>
    </>
  );
};