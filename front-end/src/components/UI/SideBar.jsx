import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LINKS } from '../../constants/Links'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

export const SideBar = () => {
  const navigate = useNavigate();
  const pathName = location.pathname
  
  return (
    <div className='flex flex-col gap-4 px-2 mt-10 w-[16%] fixed'>
      {
        LINKS && LINKS.length ?
          LINKS.map((LINK) =>{
            return <div className={`flex gap-2 items-center cursor-pointer hover:bg-blue-700 px-2 py-1 rounded-lg duration-200 ${pathName === LINK.LINK ? 'bg-blue-700' : null}`}
              onClick={() => navigate(LINK.LINK)}>
              <div>{LINK.ICON}</div>
              <span className='text-lg'>{LINK.TEXT}</span>
            </div>
          })
        :null
      }
      <div className='flex gap-2 items-center px-2 py-2 cursor-pointer'>
        <ArrowRightStartOnRectangleIcon className='w-8 h-8' strokeWidth={1} />
        <span className='text-lg'>Logout</span>
      </div>
    </div>
  )
}
