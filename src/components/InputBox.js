import React from 'react'
import './style.scss'

 const InputBox=(props)=>{
  const inputValue=props.value
  const hangleOnChange=(e)=>{
        props.onChange(e)
  }
  const handleInputEnter=(e)=>{
      if(props.onKeyUp){
            props.onKeyUp(e)
      }
  }
  return <input type='text' 
        placeholder={props.name} 
        value={inputValue} 
        className='input-box border 200-gray p-2 mt-3 '
        onChange={hangleOnChange}
        onKeyUp={handleInputEnter}
        />
}
export default InputBox