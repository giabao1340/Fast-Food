"use client"
import { useState } from 'react'
import { Toaster } from 'sonner'
import Header from './(auth)/_components/Header'
import { CartUpdateContext } from './_context/CartUpdateContext'

function Provider({children}) {
  const [updateCart, setUpdateCart] = useState();

  return (
    <CartUpdateContext.Provider value={{updateCart,setUpdateCart}}>
    <div className='px-10 md:px-20 relative'>
        <Header/>
        <Toaster />
        {children}
    </div>
    </CartUpdateContext.Provider>
  )
}

export default Provider