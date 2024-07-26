"use client"

import { Crisp } from "crisp-sdk-web"
import { useEffect } from "react"

export const CrispChat = ()=>{


    useEffect(()=>{
        Crisp.configure("200c362d-418a-49e9-b2e3-f7b1fc5ffb3b")
    },[])

    return null
}