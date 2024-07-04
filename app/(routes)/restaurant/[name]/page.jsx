"use client"

import GlobalApi from "@/app/(auth)/_utils/GlobalApi";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Intro from "../_components/Intro";
import RestroTabs from "../_components/RestroTabs";

function RestaurantDetail() {

    const param = usePathname();
    const [restaurant, setRestaurant]= useState();
    useEffect(()=>{
        GetRestaurantDetails(param.split("/")[2]);
    })


    const GetRestaurantDetails=(restroSlug)=>{
        GlobalApi.GetBusinessDetail(restroSlug).then(resp=>{
            setRestaurant(resp.restaurant)
        })
    }
    




  return (
    <div>
      <Intro restaurant={restaurant}/>
      <RestroTabs restaurant={restaurant}/>
    </div>
  )
}

export default RestaurantDetail
