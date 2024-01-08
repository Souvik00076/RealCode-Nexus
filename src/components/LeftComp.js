import React from 'react'
import './styles.scss'
import Client from './Client'
import Button from './Button'
const LeftComp=()=>{
  return (
  <>
<div className='w-1/5 h-screen flex flex-col py-1 px-4'>
  <div className="mb-4 flex-grow">
    <img src='/real-code-nexus.png' alt='Logo' className='w-full h-24'/>
    <div className="border-t border-gray-300 my-4"></div>
    <div className='client-list grid grid-cols-3 overflow-y-auto max-h-calc'>
      {/* Add more clients as needed */}
    </div>
  </div>

  <div className='flex flex-col items-center fixed bottom-0 mb-4'>
    <Button name="Copy Room ID" class_name="cp-room"/>
    <Button name="Leave" class_name="lv-room"/>   
  </div>
</div>



  </>
  )
}

export default LeftComp