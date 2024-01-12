import React, { useState,useRef,useEffect } from 'react'
import LeftComp from '../components/LeftComp'
import '../App.scss'
import Editor from '../components/Editor'
import { initSocket } from '../client/socket'
import ACTIONS from '../ACTIONS'
import { useParams,
          useLocation,
          useNavigate,
          Navigate
       } from 'react-router-dom'

const EditorPage=()=>{
  const [clients,setClients]=useState([])
  const {roomId}=useParams()
  const socketRef=useRef(null)
  const codeRef=useRef(null)
  const location=useLocation()
  const reactNavigator=useNavigate()
  useEffect(()=>{
      const init=async()=>{
        if(!location.state){
          <Navigate to='/'/> //redirecting
        }  
        socketRef.current=await initSocket()
        socketRef.current.on(ACTIONS.CONNECT_ERROR,(err)=>handleError(err))
        socketRef.current.on(ACTIONS.CONNECT_FAILED,(err)=>handleError(err))
        socketRef.current.emit(ACTIONS.JOIN,{
          roomId,
          username:location.state?.userName
        })
        socketRef.current.on(ACTIONS.JOINED,({clientList,username,socketId})=>{
            if(username!==location.state?.userName){
              console.log("new join")
              //TODO : Show toast here
            }
            setClients(clientList)
            socketRef.current.emit(ACTIONS.SYNC_CODE,{
                code:codeRef.current,
                socketId
            })
        })
        socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
          //show toast username left the room
          setClients((prev)=>{
            return prev.filter(client=>client.socketId!==socketId)
          })
        })       
        function handleError(err){
          reactNavigator('/')
        }
      }
      init()
      return ()=>{
        socketRef.current.off(ACTIONS.JOINED)
        socketRef.current.off(ACTIONS.DISCONNECTED)
        socketRef.current.disconnect()
      }
  },[])
 

  return (
    <div className='main-wrapper flex flex-row'>
      <LeftComp clients={clients} roomId={roomId}/>
      <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>{
        codeRef.current=code
      }}/>
     
    </div>
  )
}
export default EditorPage

