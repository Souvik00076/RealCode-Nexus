import React, { Component } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { Route } from "react-router-dom";
import {v4 as uuidV4} from 'uuid'
import { useState } from "react";
import '../App.scss'


const Img=()=>{
  return <img src="/real-code-nexus.png" className="w-40 h-24" /> 
}


const TitleHeader=()=>{
  return <h4 className="mt-2 text-xl">Paste Room ID Here</h4>
}


const RouteToNewRoom=({onClick})=>{
  return <h4 className="font-bold  text-l mt-4">If you don't have an invite then create &nbsp; <a onClick={onClick} href="" className="link-style">New Room</a></h4>
}


export default class Home extends Component {
  state={
    roomId:'',
    userName:''
  };
  generateUid=(e)=>{
      e.preventDefault()
      const roomId=uuidV4()
      this.setState({roomId:roomId})
  }

  setUid=(e)=>{
    console.log('new uid')
    this.setState({roomId:e.target.value})
  }
  setUserName=(e)=>{
    console.log('User Name')
    this.setState({userName:e.target.value})
  }

  render() {
    
    return (
        <div className="form-container flex items-center flex-col border-2 border-sky-500 p-10">
          <Img/>
          <TitleHeader/>
          <InputBox name="Room Id" value={this.state.roomId} onChange={this.setUid}/>
          <InputBox name="User Name" value={this.state.userName} onChange={this.setUserName}/>
          <Button className='join-button' name='Join'/>
          <RouteToNewRoom onClick={this.generateUid}/>
        </div>
    );
  }
}
