import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPhone, faLocationDot, faEnvelope, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import styles from '../../styles/Footer/getInTouch.module.css'
const GetInTouch = () => {
  return (
<div className={styles.getInTouchBox}>
        <h4 className={styles.getInTouchTitle}>Get In Touch</h4>
        <div className={styles.titleUnderline}></div>
        <div className={styles.contactInfo}>
            <div className={styles.footerContactBox}>
                <FontAwesomeIcon icon={faLocationDot} className={styles.footerContactIcon}/>
                <div className={styles.addressHeaderDiv}>
                    <p className={styles.footerPOBoxAddress}>P.O. Box 3453 Crofton, MD</p>
                    <p className={styles.footerPOBoxZip}>21114</p>
                </div> 
            </div>
            <div className={styles.footerContactBox}>
                <FontAwesomeIcon icon={faPhone}  className={styles.footerContactIcon}/>
                <p className={styles.footerPhoneNumber}>301-261-8473</p>
            </div>
            <div className={styles.footerContactBox}>
                <FontAwesomeIcon icon={faEnvelope}  className={styles.footerContactIcon}/>
                <p className={styles.footerEmail}>admin@pdireserves.com</p>
            </div>
            <div className={styles.footerContactBox}>
                <FontAwesomeIcon icon={faStopwatch}  className={styles.footerContactIcon}/>
                <p className={styles.businessHours}>Mon - Fri : 9am to 5pm</p>
            </div>
        </div>
</div>  )
}

export default GetInTouch