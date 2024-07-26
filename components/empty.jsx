import Image from 'next/image'
import React from 'react'

function Empty({label}) {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
        <div className="relative h-72 w-72">
            <Image  alt='Empty' fill src="/empty.png"/>
        </div>
        <div className="text-muted-foreground text-sm text-center">
            {label}
        </div>
    </div>
  )
}

export default Empty