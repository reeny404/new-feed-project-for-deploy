import React from 'react'

const Form= ({ children, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit} className='flex flex-col bg-gray-200'>
      {children}
    </form>
  )
}

export default Form