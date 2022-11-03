import React, { ReactElement, useContext } from 'react'
import Layout from '../../../layouts/_setLayout'
import { NextPageWithLayout } from '../../_app'
import styles from '../../../styles/Pages/Auth/account.module.css'
import { ContextConsumer } from '../../../state/rootContext'
import { ITestAuth } from '../../../types/authState'
import Link from 'next/link'
const Account: NextPageWithLayout = () => {
  const {state, actions} = useContext(ContextConsumer);
  const userInfo = state.auth.data as ITestAuth;
  return (
    <div className={styles.accountPage}>
      <h1>My Account</h1>
      <div className={styles.accountInfoContainer}>
        <h3>Personal</h3>
        <div className={styles.accountInfoBox}>
          <div className={styles.accountInfoItem}>
            <p>First Name: {userInfo.firstName}</p>
          </div>
          <div className={styles.accountInfoItem}>
            <p>Last Name: {userInfo.lastName}</p>
          </div>
          <div className={styles.accountInfoItem}>
            <p>Email: {userInfo.email}</p>
          </div>
        </div>
      </div>
      <div className={styles.settingsButtonBox}>
        <Link href="/auth/account/settings">
          <div className={styles.settingsButton}>Settings</div>
        </Link>
      </div>
    </div>
  )
}

export default Account

Account.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    );
}