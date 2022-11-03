import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo } from 'react'
import { ContextConsumer } from '../../state/rootContext'
import styles from '../../styles/Auth/userMenu.module.css'
import { ITestAuth } from '../../types/authState'
import { IWindow } from '../../types/window'

interface UserMenuProps {
  authMenuPos: DOMRect
}

const UserMenu = (props: UserMenuProps) => {
  const {state, actions} = useContext(ContextConsumer)
  const {authMenuPos} = props;
  const windowData = useMemo(()=>{
    const data = state.window.data as IWindow;
    return data;
  }, [state.window.data])
  const router = useRouter()
  const authData = useMemo(()=>{
    const data = state.auth.data as ITestAuth;
    return data;
  }, [state.auth.data])
  useEffect(()=>{
    console.log({authMenuPos});
  }, [])

  const logoff = async () => {
    try{
      await actions.auth?.logout()
      router.push('/')
    }
    catch(err: any){
      console.log({err});
    }
  }

  const changePage = (href: string) => {
    router.push(href)
  }

  return (
    <div style={{right: windowData.width-authMenuPos.right+13}} className={styles.userMenu}>
      <div className={styles.userMenuSelectionBox}>
          <div onClick={()=>changePage('/auth/account')} className={styles.userMenuSelection}>My Account</div>
      </div>
      {
        !authData.roles.includes('admin')
        ?
        null
        :
        <div className={styles.userMenuSelectionBox}>
          <div onClick={()=>changePage('/admin/clients')} className={styles.userMenuSelection}>Clients</div>
        </div>
      }
      <div className={styles.userMenuSelectionBox}>
          <div onClick={()=>changePage('/auth/messages')} className={styles.userMenuSelection}>Messages</div>
      </div>
      <div className={styles.userMenuSelectionBox}>
          <div onClick={()=>changePage('/auth/account/settings')} className={styles.userMenuSelection}>Settings</div>
      </div>
      <div style={{borderBottom: 'none'}} className={styles.userMenuSelectionBox}>
        <div onClick={()=>logoff()} className={styles.userMenuSelection}>Logoff</div>
      </div>
    </div>
  )
}

export default UserMenu
