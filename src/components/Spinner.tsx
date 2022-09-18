import React from 'react'
import mainload from '../images/mainload.svg'

export default function Spinner() {
  return (
    <div className='flex justify-center items-center h-full'>
      <img src={mainload} alt="MainLoad" className='w-32'/>
    </div>
  )
}
