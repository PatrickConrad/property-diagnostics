import React from 'react'
import styles from '../../styles/Footer/infoFooter.module.css'
import GetInTouch from './GetInTouch'
import MyMap from './Map'
import ReserveStudiesLinks from './ReserveStudiesLinks'
import WhatWeDo from './WhatWeDo'

const InfoFooter = () => {
  return (
    <div className={styles.infoFooterBox}>
        <WhatWeDo />
        <ReserveStudiesLinks />
        <GetInTouch />
        <MyMap />
    </div>
  )
}

export default InfoFooter