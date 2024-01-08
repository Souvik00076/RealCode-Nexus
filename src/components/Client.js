import React from 'react'
import Avatar from 'react-avatar'
import './styles.scss'
const Client = (props) => {
  return (
    <div className='client'>
      <Avatar
        name={props.name}
        size='50'
        round={true}/>
    </div>
  )
}

export default Client
