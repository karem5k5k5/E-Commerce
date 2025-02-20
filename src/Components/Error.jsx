import React from 'react'
import error from '../assets/error.svg'

const Error = () => {
  return (
    <picture>
      <img className=' mx-auto my-12' src={error} alt="error" />
    </picture>
  )
}

export default Error