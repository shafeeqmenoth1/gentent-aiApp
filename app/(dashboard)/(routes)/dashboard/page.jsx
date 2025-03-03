'use client'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'


const tools = [
 
  {
      label:"Conversation",
      icon:MessageSquare,
      href:"/conversation",
      color:"text-violet-500",
      bgColor:"bg-violet-500/10"
  },
  {
      label:"Image Generation",
      icon:ImageIcon,
      href:"/image",
      color:"text-pink-700",
      bgColor:"bg-pink-500/10"
  },
  {
      label:"Video Generation",
      icon:VideoIcon,
      href:"/video",
      color:"text-orange-700",
      bgColor:"bg-orange-500/10"
  },
  {
      label:"Music Generation",
      icon:Music,
      href:"/music",
      color:"text-emerald-500",
      bgColor:"bg-emerald-500/10"
  },
  {
      label:"Code Generation",
      icon:Code,
      href:"/code",
      color:"text-green-700",
      bgColor:"bg-green-500/10"
  },

]

export default function DashboardPage() {


const router = useRouter()
  return (
  <div>
   <div className="mb-8 space-y-4">
    <h2 className="text-2xl md:text-4xl font-bold text-center">
      Explore the power of AI
    </h2>
    <p className='text-muted-foreground font-light text-sm md:text-lg text-center'>Chat with the smartest AI - Experience the power of AI</p>
   </div>
   <div className="px-4 md:px-20 lg:px-32 space-y-4">
   
                {tools.map(tool=>(
                  <Card key={tool.href}
                  onClick={()=>router.push(tool.href)}
                  className="p-4 border-black/5 flex items-center
                  justify-between hover:shadow-md transition cursor-pointer">
                      <div className="flex items-center gap-x-4">
                        <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                          <tool.icon className={cn("w-8 h-8",tool.color)}/>
                        </div>
                        <div className="font-semibold">
                          {tool.label}
                        </div>
                      </div>
                      <ArrowRight className='w-5 h-5'/>
                  </Card>
                ))}
           
   </div>
  </div>
  )
}
