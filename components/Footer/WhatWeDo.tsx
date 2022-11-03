import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Footer/whatWeDo.module.css'
const WhatWeDo = () => {
  return (
    <div className={styles.whatWeDoSection}>
        <a href="https://www.pdireserves.com/"><img className={styles.footerLogo} alt="logo" src='/logo.png'/></a>
        <p className={styles.businessInfo}>We provide professional Reserve Studies to help preserve your property. Our professional team is here to make sure your property is assessed properly and meets any legal requirements.</p>
        <a href="https://www.pdireserves.com/index.php?id=13" className={styles.readMoreBusinessInfo}>{`Read More >`}</a>
    </div>
  )
}

export default WhatWeDo