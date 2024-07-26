'use client'

import { useState } from "react"
import axios from "axios"
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useProModal } from '@/hooks/use-pro-modal'
import { Badge } from './ui/badge'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import toast from "react-hot-toast"
  

const tools = [
 
  {
      label:"Conversation",
      icon:MessageSquare,
      color:"text-violet-500",
      bgColor:"bg-violet-500/10"
  },
  {
      label:"Image Generation",
      icon:ImageIcon,
      color:"text-pink-700",
      bgColor:"bg-pink-500/10"
  },
  {
      label:"Video Generation",
      icon:VideoIcon,
      color:"text-orange-700",
      bgColor:"bg-orange-500/10"
  },
  {
      label:"Music Generation",
      icon:Music,
      color:"text-emerald-500",
      bgColor:"bg-emerald-500/10"
  },
  {
      label:"Code Generation",
      icon:Code,
      color:"text-green-700",
      bgColor:"bg-green-500/10"
  },

]

const ProModal = () => {
  const proModal = useProModal()
  const [loading,setLoading] = useState(false)

  
  const onSubscribe = async()=>{
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
        toast.error("Something went wrong")
       
    }finally{
      setLoading(false)
    }
  }
  return (
 <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle className='flex justify-center items-center flex-col gap-y-4 pb-2' >
              <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to priceTag
                <Badge variant="premium" className='text-sm uppercase py-1'>
                  Pro
                </Badge> 
                </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 ">
            {tools.map(tool=>(
                  <Card key={tool.label}
                  className="p-3 border-black/5 flex items-center
                  justify-between">
                      <div className="flex items-center gap-x-4">
                        <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                          <tool.icon className={cn("w-6 h-6",tool.color)}/>
                        </div>
                        <div className="font-semibold text-sm">
                          {tool.label}
                        </div>
                      </div>
                      <Check className='text-primary w-5 h-5'/>
                  </Card>
                ))}
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Button disable={loading} onClick={onSubscribe} size='lg' className='w-full' variant="premium" >
            Upgrade <Zap className='h-4 w-4 fill-white ml-2'/>
          </Button>
        </DialogFooter>
    </DialogContent>
 </Dialog>
  )
}

export default ProModal