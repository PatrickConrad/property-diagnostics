import React, { useContext, useEffect, useMemo, useRef } from 'react'
import NavBar from './NavBar'
import TitleBar from './TitleBar'
import styles from '../../styles/Header/index.module.css'
import { ContextConsumer } from '../../state/rootContext'
import { IHeader, IWindow } from '../../types/window'
import { useRouter } from 'next/router'

interface HeaderProps {
  setHeaderHeight: (height: number)=>void;
}

const Header = (props: HeaderProps) => {
  const {setHeaderHeight} = props;
  const {state, actions} = useContext(ContextConsumer);
  const headerRef = useRef<HTMLDivElement>(null);
  const windowData = useMemo(()=>{
    const data = state.window.data as IWindow
    return data
  }, [state.window.data])

  const setHeaderSize = async (height: number) => {
    try{
      await actions.header?.setHeaderSize({height})
    }
    catch(err: any){
      console.log(err);
    }
  }

  useEffect(()=>{
    const height = headerRef.current?.getBoundingClientRect().height;
    if(!height) return;
    setHeaderHeight(height)
    setHeaderSize(height)
    return;
  }, [windowData])
  const menuOpen = useMemo(()=>{
    const data = state.header.data as IHeader;
    return data.menuOpen
  }, [state.header.data])
  return (
    <div ref={headerRef} className={styles.pageHeader}>
        
        <>
          {
            windowData.width<600
            ?
            null
            :
            <div className={styles.topOfPageBar}>
              <p>Welcome to the Leader in Property Reserve Studies in the DMV</p>
              {
                windowData.width<850
                ?
                null
                :
                <p>Reserve to Preserve</p>
              }
            </div>
          }
          {
            windowData.width < 550
            ?
            null
            :
            <TitleBar />
          }
        </>
        <NavBar />
    </div>
  )
}

export default Header