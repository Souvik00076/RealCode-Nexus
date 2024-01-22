import React from 'react'
import '../App.scss'
const Button=(props)=>{

     const onclick=()=>{
          if(props.onClick)
          props.onClick()
          else console.log("click")
     }
     const handleInputEnter=(e)=>{
          if(props.onKeyUp){
               props.onKeyUp(e)
          }
     }
     return <button className={`submit-button ${props.class_name}`} 
               onClick={onclick} 
               onKeyUp={handleInputEnter}>
               {props.name}
               </button>
}
export default Button
