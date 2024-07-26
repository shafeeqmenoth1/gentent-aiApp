import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'
import React from 'react'

async function DashboardLayout({children}) {

  const apiLimitCount = await getApiLimitCount()
  const isPro = checkSubscription()
  return (
    <div className='h-full relative'>
        <div className="hidden h-full md:flex md:w-72
        md:flex-col md:fixed  bg-gray-900">
<div>
   <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
        </div>
        <main className="pb-8 md:pl-72">
            <Navbar/>
            {children}
        </main>
    
    </div>
  )
}

export default DashboardLayout