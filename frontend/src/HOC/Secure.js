import React from 'react'
import Authenticate from '../customHooks/Authenticate'

const Secure = ({Component}) => {
    Authenticate()
  return <Component/>
}

export default Secure