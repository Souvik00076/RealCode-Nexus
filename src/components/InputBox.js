import React from 'react'
import './styles.scss'
export default function InputBox(props) {
  const inputValue=props.value
  const hangleOnChange=(e)=>{
        props.onChange(e)
  }
  return <input type='text' 
        placeholder={props.name} 
        value={inputValue} 
        className='input-box border 200-gray p-2 mt-3 rounded-full'
        onChange={hangleOnChange}
        />
}
