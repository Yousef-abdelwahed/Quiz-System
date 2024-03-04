import React from 'react'
import './LoadingSpinner.module.scss'

const LoadingSpinner = () => {
  return <>
  <div className='flex justify-center items-center h-[80%] '>
    <span className="loader"></span>
  </div>
  </>
}

export default LoadingSpinner