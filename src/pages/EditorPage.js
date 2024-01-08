import React, { Component } from 'react'
import LeftComp from '../components/LeftComp'
import '../App.scss'
import Editor from '../components/Editor'

const EditorPage=()=>{
  return (
    <div className='main-wrapper flex flex-row'>
      <LeftComp/>
      <Editor/>
    </div>
  )
}
export default EditorPage

