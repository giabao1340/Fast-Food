"use client"
import { CartUpdateContext } from "@/app/_context/CartUpdateContext"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import GlobalApi from "../_utils/GlobalApi"

function Header() {
    const{user, isSignedIn} = useUser();
    const {updateCart,setUpdateCart} = useContext(CartUpdateContext);
    const [cart, setCart] = useState([])
    useEffect(()=>{
      console.log("ThienSTyl")
      user&&GetUserCart()
    },[updateCart&&user])

    const GetUserCart=()=>{
      GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(resp=>{
        console.log(resp)
        setCart(resp?.userCarts)
      })

    }
  return (
    <div className="flex justify-between items-center p-6 md:px-20 shawdow-sm ">
      <Image src="/logo.png" alt="logo"
        width={200}
        height={200}
      />
        <div className="flex border p-2 rounded-lg bg-gray-200 w-96 ">
            <input type="text" className="bg-transparent w-full outline-none"/>
            <Search/>
        </div>
        {isSignedIn ?
        <div className="flex gap-3">
          <div className="flex gap-2 items-center">
            <ShoppingCart/>
            <label className="p-1 px-2 rounded-full bg-slate-200">
              {cart?.length}
            </label>
          </div>
            <UserButton/>
        </div>
        :<div className="flex gap-5">
        <SignInButton mode="modal">
            <Button variant="outline">Login</Button>
        </SignInButton>
        <SignUpButton mode="modal">
            <Button>Sign Up</Button>
        </SignUpButton>
           
            
        </div>}
    </div>
    
  )
}

export default Header
