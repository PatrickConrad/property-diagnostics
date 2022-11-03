import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Portal from '../HOC/Portal'

interface FullScreenProps {
  children?: ReactNode,
  close: ()=> void,
  domRef?: React.RefObject<HTMLDivElement>
}

const FullScreen = (props: FullScreenProps) => {
  const {close} = props;
  const windowRef = useRef<HTMLDivElement>(null)
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const windowModalRect = windowRef.current?.getBoundingClientRect()
    if(!windowModalRect) return;
    if(e.clientX>windowModalRect?.left! && e.clientX<windowModalRect?.right! && e.clientY>windowModalRect?.top! && e.clientY<windowModalRect?.bottom!) return;
    close()
  }
  const [closeBtn, setCloseBtn] = useState<{cursorStyle: string, color: string}>({color: 'white', cursorStyle: 'default'})
  
  return (
    <Portal>
      <>
        <div onClick={(e)=>{closeModal(e)}} style={{position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, .9)', zIndex: 20000}}/>
        <div onClick={(e)=>{closeModal(e)}} style={{position: 'fixed', top: 20, right: 20, color: 'white', zIndex: 20001}}>
          <FontAwesomeIcon onMouseLeave={()=>{setCloseBtn({color: 'white', cursorStyle: 'default'})}} onMouseOver={()=>{setCloseBtn({color: '#F05B23', cursorStyle: 'pointer'})}} icon={faXmark} style={{fontSize: '30px', color: closeBtn.color, cursor: closeBtn.cursorStyle}}/>
        </div>
        <div ref={windowRef} style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2000000}}>
          {
            props.children
          }
        </div>
      </>
    </Portal>
  )
}

export default FullScreen