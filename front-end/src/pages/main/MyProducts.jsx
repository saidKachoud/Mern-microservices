import React, { useEffect, useState } from 'react'
import { SideBar } from '../../components/UI/SideBar'
import { Product } from '../../components/UI/Product'
import { deleteProduct, getMyProducts } from '../../services/productServices';
import { Notification } from '../../components/UI/Notification';

export const MyProducts = () => {

  const [loading,setLoading] = useState(true);
  const [products,setProducts] = useState([]);
  const [notification,setNotification] = useState({})

  const getMyProducts_FUNCTION = async () =>{
    const response = await getMyProducts(localStorage.getItem("token"));
    setLoading(false);
    setProducts(response.data.products)        
  }

  const deleteProduct_FUNCTION = async (productId) =>{
    setNotification(null);
    try{
      const response = await deleteProduct(localStorage.getItem('token'),productId);
      if(response.status === 200){
        setNotification({type:"success",message:response.data.message});
        getMyProducts_FUNCTION();
      }
    }catch(error){
      if(error.response){
        setNotification({type:'error',message:"Try again later"})
      }
    }
  }

  useEffect(() =>{
    getMyProducts_FUNCTION();
  },[])


  return (
    <div className='flex'>
      <SideBar />
      <div className='mt-7 ml-[18%] w-[80%]'>
        <div>
          <div className='flex justify-between'>
            <div> 
              <h1 className='text-3xl font-semibold'>Your products</h1>
            </div>
          </div>
        </div>
        <div className='mt-8 flex gap-5 flex-wrap'>
          {
            products && !loading && products.length ?
              products.map((product) =>{
                return <Product product={product} deleteBtn={true} deleteProduct={deleteProduct_FUNCTION}/>
              })
            :"No products founded"
          }
        </div>
        {
          notification && <Notification type={notification.type} message={notification.message} />
        }
      </div>
    </div>
  )
}
