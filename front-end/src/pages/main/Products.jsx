import React, { useEffect, useState } from 'react'
import { SideBar } from '../../components/UI/SideBar'
import { Product } from '../../components/UI/Product'
import { getProducts } from '../../services/productServices';
import { Button } from '../../components/UI/Button';
import { AddProduct } from '../../components/modals/AddProduct';

export const Products = () => {

  const [loading,setLoading] = useState(true);
  const [products,setProducts] = useState([]);
  const [openModal,setOpenModal] = useState(false);

  const getProducts_FUNCTION = async () =>{
    const response = await getProducts(localStorage.getItem("token"));
    setLoading(false);
    setProducts(response.data.products)
    console.log(response);
    
  }


  useEffect(() =>{
    getProducts_FUNCTION();
  },[])

  return (
    <div className='flex'>
      <SideBar />
      <div className='mt-7 ml-[18%] w-[80%]'>
        <div>
          <div className='flex justify-between'>
            <div> 
              <h1 className='text-3xl font-semibold'>Products goes here</h1>
            </div>
            <div className='flex gap-2 w-[25%]'>
              <Button text={'Add Product'} onClick={() => setOpenModal(true)}/>
              <Button text={'Command'} bg={'bg-green-600'}/>
            </div>
          </div>
        </div>
        <div className='mt-8 flex gap-5 flex-wrap'>
          {
            products && !loading && products.length ?
              products.map((product) =>{
                return <Product product={product} />
              })
            :"No products founded"
          }
          {
            openModal && <AddProduct setOpen={setOpenModal}/>
          }
        </div>
      </div>
    </div>
  )
}
