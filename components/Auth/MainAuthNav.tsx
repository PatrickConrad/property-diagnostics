import Link from 'next/link'
import React, { useContext, useMemo } from 'react'
import { ContextConsumer } from '../../state/rootContext'
import styles from '../../styles/Header/navBar.module.css'
import { ITestAuth } from '../../types/authState'

const MainAuthNav = () => {
    const {state, actions} = useContext(ContextConsumer);
    const authData = useMemo(()=>{
        const data = state.auth.data as ITestAuth;
        return data
    }, [state.auth.data])
  return (
    <>
        <div className={styles.navBarBox}>
            <div className={styles.navLinkBox}>
                <Link  href={!authData.roles.includes('admin')?'/auth':'/admin'}>
                    <a className={styles.navLink}>HOME</a>
                </Link>
                <div className={styles.navSeporatorBox}>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                </div>
            </div>
            <div className={styles.navLinkBox}>
                <Link href={'/auth/properties'}>
                    <a className={styles.navLink}>PROPERTIES</a>
                </Link>
                <div className={styles.navSeporatorBox}>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                </div>
            </div>
            <div className={styles.navLinkBox}>
                <Link href={`/auth/account`}>
                    <a className={styles.navLink}>ACCOUNT</a>
                </Link>
                <div className={styles.navSeporatorBox}>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                    <div className={styles.navSeporator}></div>
                </div>
            </div>
            {
                !authData.roles.includes('admin')
                ?
                null
                :
                <div className={styles.navLinkBox}>
                    <Link href='/admin/clients'>
                        <a className={styles.navLink}>CLIENTS</a>
                    </Link>
                </div>
            }           
        </div>
    </>
  )
}

export default MainAuthNav