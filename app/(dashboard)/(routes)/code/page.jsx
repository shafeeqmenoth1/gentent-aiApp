"use client"

import axios from "axios"
import * as z from "zod"
import { useRouter } from "next/navigation"
import Heading from '@/components/heading'
import { Code } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from "./constants"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import UserAvatar from "@/components/user-avatar"
import BotAvatar from "@/components/bot-avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Empty from "@/components/empty"
import Loader from "@/components/loader"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import { useProModal } from "@/hooks/use-pro-modal"
import toast from "react-hot-toast"


function CodePage() {
  const [messages,setMessages] = useState([])
  const router = useRouter()
  const proModal = useProModal()
  const form = useForm({
  resolver:zodResolver(formSchema),
    defaultValues:{
      prompt:""
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async(values)=>{
    try {
        const userMessage = {
          role:'user',
          content:values.prompt
        }
        const newMessages = [...messages,userMessage]

        const response = await axios.post("/api/code",{
          messages:newMessages
        })
    
        console.log(response.data);
        setMessages((prev)=>[...prev,userMessage,response.data])
        form.reset()
    } catch (error) {
      if(error?.response?.status === 403){
        proModal.onOpen()
       }else {
        toast.error("Something went wrong")
       }
    } finally {
      router.refresh()
    }
  } 

  return (
    <div>
    <Heading
    title="Code Generation"
    description="Generate code using descriptive text."
    icon = {Code}
    iconColor="text-green-700"
    bgColor="bg-green-700/10"
    />
    <div className="px-4 lg:px-8">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg
          border
          border
          w-full
          p-4
          px-3
          md:px-6
          focus-within:shadow-sm
          grid
          grid-cols-12
          gap-2">
            <FormField
            name="prompt"
            render={({field})=>(
              <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input {...form.register('prompt')}
                      className="border-0 outiline-none focus-visible:ring-0
                      focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder = "Simple toggle button using react hooks."
                    />
                  </FormControl>
              </FormItem>
            )} />
            
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader/>
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="No Conversation started."/>
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message)=>(
            <div key={message.content} 
            className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",message.role === "user" ? "bg-white border border-black/10": "bg-muted")}>
             {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
            <ReactMarkdown
            components = {{pre:({node,...props})=>(
              <div  className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                <pre {...props}/>
              </div>
            ),
          code:({node,...props})=>(
            <code className="bg-black/10 rounded-lg p-1" {...props}/>
          )}}
            className="text-sm overflow-hidden leading-7"
            >
            {message.content || ""}
            </ReactMarkdown>

            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default CodePage