import React from 'react'
import { SideBar } from '../../components/UI/SideBar'
import { Product } from '../../components/UI/Product'

export const MyProducts = () => {
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
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </div>
  )
}
