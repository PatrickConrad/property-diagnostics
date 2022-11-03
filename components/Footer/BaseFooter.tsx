import React, { useContext, useMemo } from 'react'
import { ContextConsumer } from '../../state/rootContext'
import styles from '../../styles/Footer/baseFooter.module.css'
import { IWindow } from '../../types/window';

const BaseFooter = () => {
  const {state, actions} = useContext(ContextConsumer);
  const windowData = useMemo(()=>{
    const data = state.window.data as IWindow;
    return data
  }, [state.window.data])
  return (
    <div className={styles.baseFooter}>
      <div className={styles.baseFooterBox}>
        <div className={styles.copyrightInfoBox}>
          <p >Copyright © 2020 - Current</p>
          {
            windowData.width<750
            ?
            null
            :
            <p className={styles.copyrightSeperator}>|</p> 
          }
          <p>All Rights Reserved</p>
        </div>
          <a className={styles.privacyPolicy} href="https://www.pdireserves.com/privacy-policy">Privacy Policy</a>
      </div>    
    </div>
  )
}

export default BaseFooter