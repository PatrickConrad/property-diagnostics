import React from 'react'
import styles from '../../styles/Footer/index.module.css'
import BaseFooter from './BaseFooter'
import InfoFooter from './InfoFooter'
const Footer
 = () => {
  return (
    <footer className={styles.footerMain}>
        <InfoFooter />
        <BaseFooter />
    </footer>
  )
}

export default Footer
