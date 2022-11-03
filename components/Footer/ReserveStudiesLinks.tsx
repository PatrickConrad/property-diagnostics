import React from 'react'
import styles from '../../styles/Footer/reserveStudiesLinks.module.css'
const ReserveStudiesLinks = () => {
  return (
<div className={styles.reserveStudiesLinksBox}>
        <h4 className={styles.reserveStudiesLinksHeading}>Reserve Studies</h4>
        <div className={styles.titleUnderline}></div>
        <ul className={styles.reserveStudiesLinks}>
            <li className={styles.reserveStudiesLinkListItem}><a className={styles.reserveStudiesLink} href="https://www.pdireserves.com/index.php?id=13#">HOA Reserve Studies</a></li>
            <li className={styles.reserveStudiesLinkListItem}><a className={styles.reserveStudiesLink} href="https://www.pdireserves.com/index.php?id=13#">Condo Reserve Studies</a></li>
            <li className={styles.reserveStudiesLinkListItem}><a className={styles.reserveStudiesLink} href="https://www.pdireserves.com/index.php?id=13#">Religious Institution Reserve</a></li>
            <li className={styles.reserveStudiesLinkListItem}><a className={styles.reserveStudiesLink} href="https://www.pdireserves.com">Resort Reserve Study</a></li>
            <li className={styles.reserveStudiesLinkListItem}><a className={styles.reserveStudiesLink} href="https://www.pdireserves.com">Marina Reserve Study</a></li>
        </ul>
    
</div>    
  )
}

export default ReserveStudiesLinks