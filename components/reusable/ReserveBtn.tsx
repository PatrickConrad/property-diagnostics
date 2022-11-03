import React from 'react'
import styles from '../../styles/reusableComponents/reserveBtn.module.css'

interface Props {
    btnText: string
}

const ReserveBtn = ({btnText}: Props) => {
  return (
    <button className={styles.reserveBtn}>
        {btnText}
    </button>
  )
}

export default ReserveBtn