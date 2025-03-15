import { Button } from '@/components/ui/button'
import React from 'react'

function Header() {
  return (
    <div className='p-4 shadow-sm border flex justify-between items-center'>
       <img src="/logo.jpeg" alt="" /> 
       <Button className="flex gap-2">Testing Button</Button>
    </div>
  )
}

export default Header