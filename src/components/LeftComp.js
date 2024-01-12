import React,{useState} from 'react'
import './style.scss'
import Client from './Client'
import Button from './Button'
import { Navigate } from 'react-router-dom'

const LeftComp=({clients,roomId})=>{
  const copyRoomId=async ()=>{
    try{
      await navigator.clipboard.writeText(roomId)
    }catch(err){
    }
  }
  const leaveRoom=()=>{
    console.log("on click");
     <Navigate to='/'/>
     
  }

  return (
  <>
<div className='w-[20%] h-screen flex flex-col py-1 px-4'>
  <div className="mb-4 flex-grow ">
    <img src='/real-code-nexus.png' alt='Logo' className='w-full h-24'/>
    <div className="border-t border-gray-300 my-4"></div>
    <div className='client-list grid grid-cols-3 overflow-y-auto max-h-calc'>
      {clients.map(({ username }, index) => (
            <Client key={index} name={username} />
          ))}
    </div>
  </div>
  <div className='flex flex-col items-center fixed bottom-0 mb-4'>
    <Button name="Copy Room ID" class_name="cp-room" onClick={leaveRoom}/>
    <Button name="Leave" class_name="lv-room" onClick={copyRoomId}/>   
  </div>
</div>
  </>
  )
}

export default LeftComp