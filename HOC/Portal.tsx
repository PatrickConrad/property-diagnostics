import React, { ReactNode, ReactPortal, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
}


const Portal: ({children}: PortalProps)=>ReactPortal|null = ({children}: PortalProps) => {
    const [mounted, setMounted] = useState<boolean>(false)
    useEffect(()=>{
        setMounted(true)
        return () => {
            setMounted(false);
            document.querySelector('#portal')?.innerHTML === null;
        }
    }, [])

  return mounted 
    ?
    createPortal(children, document.querySelector("#portal")!)
    :
    null
}

export default Portal