import React, { Component } from "react"
import InputBox from "../components/InputBox"
import Button from "../components/Button"
import {v4 as uuidV4} from 'uuid'
import { useState } from "react"
import '../App.scss'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

const Img=()=>{
  return <img src="/real-code-nexus.png" className="w-40 h-24" /> 
}


const TitleHeader=()=>{
  return <h4 className="mt-2 text-xl font-bold text-white">Paste Room ID Here</h4>
}


const RouteToNewRoom=({onClick})=>{
  return (
    <h4 className="font-bold text-l mt-4 font-bold text-white">
      If you don't have an invite then create &nbsp;
      <a onClick={onClick} href="" className="link-style text-red-500 hover:underline">
        New Room
      </a>
    </h4>
  );
  
}


const Home = () => {
  const [roomId, setRoomId] = useState('')
  const [userName, setUserName] = useState('')
  const navigate=useNavigate()

  const generateUid = (e) => {
    e.preventDefault()
    const newRoomId = uuidV4()
    setRoomId(newRoomId)
   // toast.success('New Room Id created .')
  }

  const handleRoomIdChange = (e) => {
    console.log('new uid')
    setRoomId(e.target.value)
  }

  const handleUserNameChange = (e) => {
    console.log('User Name')
    setUserName(e.target.value)
  }
  const joinRoom=()=>{
    if(!roomId || !userName){
      console.log("RoomID OR Username not provided")
      return 
    }
    
    navigate(`/editor/${roomId}`,{
      state:{
        userName
      }
    })  
  }
  const handleInputEnter=(e)=>{
    if(e.code==='Enter'){
      joinRoom()
    }
  }
  return (
      <div className="form-container flex items-center flex-col  p-10">
        <Img />
        <TitleHeader />
        <InputBox name="Room Id" value={roomId} onChange={handleRoomIdChange} onKeyUp={handleInputEnter}/>
        <InputBox name="User Name" value={userName} onChange={handleUserNameChange} onKeyUp={handleInputEnter}/>
        <Button className="join-button" name="Join" onClick={joinRoom} onKeyUp={handleInputEnter}/>
        <RouteToNewRoom onClick={generateUid} />
      </div>
  )
}

export default Home