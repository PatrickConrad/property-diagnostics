import { useRouter } from 'next/router';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { NextComponentType } from 'next';
import { ContextConsumer } from '../../state/rootContext';
import { ITestAuth } from '../../types/authState';
import AuthNav from '../Auth/AuthNav';
import styles from '../../styles/Header/titleBar.module.css'
import RegularHeader from './RegularHeader';
import { IWindow } from '../../types/window';
import Image from 'next/image';



const TitleBar: NextComponentType = () => {
  const {state, actions} = useContext(ContextConsumer);
  const isAuth = useMemo<boolean>(()=>{
    const data = state.auth.data as ITestAuth;
    if(!data.isAuth) return false;
    return true
  }, [state.auth.data])
  const router = useRouter();

  const windowData = useMemo(()=>{
    const data = state.window.data as IWindow
    return data
  }, [state.window.data])

  

  return (
    <div className={styles.titleBarBox}>
        <a href="https://pdireserves.com">
          <img alt='top of page logo' className={styles.topOfPageLogo} src="/Logo.jpg" />
        </a>
        {
          windowData.width<700
          ?
            null
          :
            !isAuth
            ?
            <RegularHeader />
            :
            <AuthNav />
        }
    </div>
  )
}

export default TitleBar