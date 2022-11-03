import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ContextConsumer } from '../../state/rootContext'
import { ITestAuth } from '../../types/authState';
import UserMenu from './UserMenu';
import styles from '../../styles/Auth/authNav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretUp, faUser } from '@fortawesome/free-solid-svg-icons'
import { IWindow } from '../../types/window';

const AuthNav = () => {
    const {state, actions} = useContext(ContextConsumer);
    const authMenuRef = useRef<HTMLDivElement>(null)
    const [authMenuPos, setAuthMenuPos] = useState<DOMRect>()
    const userData = useMemo(()=>{
        const data = state.auth.data as ITestAuth;
        return data
    }, [state.auth.data])
    
    const windowData = useMemo(()=>{
        const data = state.window.data as IWindow;
        return data;
    }, [state.window.data])

    useEffect(()=>{
        if(!authMenuRef.current) return;
        const pos = authMenuRef.current.getBoundingClientRect();
        setAuthMenuPos(pos);
        return;
    }, [state.window.data])

    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    return (
        <div className={styles.authNavDisplay} onMouseOver={()=>setShowDropdown(true)} onMouseLeave={()=>setShowDropdown(false)}>
                <div ref={authMenuRef} className={styles.authDisplayNameBox}>
                    {
                        windowData.width<750
                        ?
                        <div className={styles.menuIcon} style={{width: !showDropdown? '40px':'200px'}}>
                            <FontAwesomeIcon icon={faUser} className={styles.authUserIcon}/>
                        </div>
                        :
                        <div className={styles.authDisplayName}>{userData.email??"Error"} </div>
                    }
                    {!showDropdown?<FontAwesomeIcon style={{width: '13px'}} icon={faCaretDown} />:<div style={{width: '13px'}}></div>}
                </div>
                {
                    !showDropdown
                    ?
                    null
                    :
                    <UserMenu authMenuPos={authMenuPos!}/>
                }
        </div>
    )
}

export default AuthNav