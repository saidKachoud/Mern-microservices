import React from 'react'
import imageTest from '../../../public/play-5.jpeg'
import moment from 'moment'
import { Button } from './Button';
import { TrashIcon } from '@heroicons/react/24/outline';
const product_micro_services = import.meta.env.VITE_PRODUCT_SERVER;

export const Product = ({product,deleteBtn,deleteProduct}) => {

  return (
    <div className='bg-gray-800 rounded-lg px-3 py-3 w-[23%]'>
        <div>
            <div className='flex justify-between items-center'>
                <span className='font-semibold'>Posted by <span className='text-blue-600'>{product?.productOwnerUsername? product?.productOwnerUsername : 'Unknown'}</span></span>
                {
                  deleteBtn ?
                  <button onClick={() => deleteProduct(product._id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 duration-200 cursor-pointer'>
                    <TrashIcon className='h-5 w-5'/>
                  </button>
                  :
                  <input type='checkbox' className='w-4 h-4 cursor-pointer'/>
                }
            </div>
            <img src={product_micro_services + product.image} className='w-[100%] h-52 rounded-lg mt-2 hover:scale-105 cursor-pointer duration-200'/>
        </div>
        <div className='mt-2'>  
            <span className='text-lg font-semibold'>{product.title}</span><br></br>
            <span>{product.description}</span>
            <h1 className='text-2xl font-semibold'>{product.price}</h1>
            <span className='font-semibold'>Posted {moment(product.createdAt).fromNow()}</span>
        </div>
    </div>
  )
}
