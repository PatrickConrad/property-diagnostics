import React, { useContext, useMemo } from 'react'
import styles from '../../styles/Header/regularHeader.module.css'
import ReserveBtn from '../reusable/ReserveBtn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { ContextConsumer } from '../../state/rootContext'
import { IWindow } from '../../types/window'

const RegularHeader = () => {
  const {state, actions} = useContext(ContextConsumer);
  const windowData = useMemo(()=>{
    const data = state.window.data as IWindow
    return data
  }, [state.window.data])
  return (
    <div className={styles.regularHeaderBox}>
        {
          windowData.width<1230
          ?
          null
          :
          <>
            <div className={styles.addressBox}>
              <FontAwesomeIcon className={styles.headerContactIcon} icon={faLocationDot}/>
              <div className={styles.contactPOHeaderBox}>
                <p className={styles.headerPOBox}>	P.O. BOX 3453</p>
                <p className={styles.headerLocation}>Crofton, MD 21114</p>
              </div>
            </div>
            <div className={styles.phoneInfoBox}>
              <FontAwesomeIcon  className={styles.headerContactIcon} icon={faPhone}/>
              <div className={styles.contactInfoHeaderBox}>
                <p className={styles.headerPhoneNumber}>+1 (301) 261-8473</p>
                <p className={styles.headerEmail}>admin@pdireserves.com</p>
              </div>
            </div>
          </>
        }
        <div className={styles.requestReserveBtnBox}>
            <ReserveBtn btnText="REQUEST A QUOTE"/>
        </div>
    </div>
  )
}

export default RegularHeader