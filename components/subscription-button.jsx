"use client"
import { Zap } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import axios from "axios"


export const SubcriptionButton = ({isPro =false})=>{
    const [loading,setLoading] = useState(false)
    const onClick = async()=>{
        try {
            setLoading(true)

            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url
        } catch (error) {
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    return (
        <Button disable={loading} variant={isPro?"default":"premium"} onClick={onClick} >
            {isPro? "Manage Subscription": "Upgrade"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}