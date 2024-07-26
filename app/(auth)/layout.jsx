import React from 'react'

function AuthLayout({children}) {
  return (
    <div className='flex items-center justify-center h-full'>
    {children}
    </div>
  )
}

export default AuthLayout