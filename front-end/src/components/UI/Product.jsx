import React from 'react'
import imageTest from '../../../public/play-5.jpeg'

export const Product = () => {
  return (
    <div className='bg-gray-800 rounded-lg px-3 py-1 w-[23%]'>
        <div>
            <div className='flex justify-between items-center'>
                <span className='font-semibold'>Posted by sofyan boukir</span>
                <input type='checkbox' className='w-4 h-4 cursor-pointer'/>
            </div>
            <img src={imageTest} className='w-[100%] h-52 rounded-lg mt-2 hover:scale-105 cursor-pointer duration-200'/>
        </div>
        <div className='mt-2'>  
            <span className='text-lg font-semibold'>This is the product title</span><br></br>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur commodi cum sit, eos ipsa ducimus error perferendis repudiandae excepturi recusandae.</span>
            <h1 className='text-2xl font-semibold'>199DH</h1>
            <span className='font-semibold'>Posted 19 hours ago</span>
        </div>
    </div>
  )
}
