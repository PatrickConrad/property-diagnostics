import Link from 'next/link'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ContextConsumer } from '../../state/rootContext'
import styles from '../../styles/Header/navBar.module.css'
import { ITestAuth } from '../../types/authState'
import { IState } from '../../types/stateInterfaces'
import { IWindow } from '../../types/window'
import MainAuthNav from '../Auth/MainAuthNav'
import MobileMenu from '../reusable/MobileMenu'
import ReserveBtn from '../reusable/ReserveBtn'
import { mobileMenuAuthSelections, mobileMenuSelections } from '../../helpers/NavLinks'
import { MySelection } from '../../types/menu'
import { useRouter } from 'next/router'
import Image from 'next/image'

const NavBar = () => {
    const router = useRouter()
    const dropdownRef = useRef<HTMLDivElement>(null)
    const {state, actions} = useContext(ContextConsumer)
    const [aboutDropdown, setAboutDropdown] = useState<boolean>(false);
    const authData = useMemo(()=>{
        const data = state.auth.data as ITestAuth;
        return data
    }, [state.auth.data])
    const [menuLinks, setMenuLinks] = useState<MySelection[]>([])
    const [hasRef, setHasRef] = useState<boolean>(false);
    const [dropdownLinkColor, setDropdownLinkColor] = useState<{blog: string, team: string}>({blog: '#0F263A', team: '#0F263A'})
   const [dropdownPosition, setDropdownPosition]= useState<number>(0)

    const windowData = useMemo(()=>{
        const data = state.window.data as IWindow
        return data
      }, [state.window.data])

    const [navRect, setNavRect] = useState<DOMRect>();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(!navRef.current) return;
        if(dropdownRef.current){
            setDropdownPosition(dropdownRef.current.getBoundingClientRect().left)
        }
        const currentMenuLinks = !authData.isAuth?mobileMenuSelections:mobileMenuAuthSelections;
        if(windowData.width>550){
            const resetLinks = currentMenuLinks?.filter(l=>l.name!=="REQUEST A QUOTE")
            setMenuLinks(resetLinks)
        }
        else if (windowData.width<550){
            setMenuLinks(currentMenuLinks)
        }
        
        setNavRect(navRef.current.getBoundingClientRect())
        setHasRef(true)
        return ()=> {
            setNavRect(undefined);
            setHasRef(false)
            setMenuLinks([])
            setDropdownPosition(NaN);
        }
    }, [navRef.current, windowData.width, authData, dropdownRef.current, router, ])
  return (
    <nav ref={navRef} className={styles.navBar}>
    {
        windowData.width>700
        ?
        <>
        {
            !authData.isAuth
            ?
                
                <div className={styles.navBarBox}>
                    <div className={styles.navLinkBox}>
                        <a className={styles.navLink} href='https://www.pdireserves.com/'>HOME</a>
                        <div className={styles.navSeporatorBox}>
                            <div className={styles.navSeporator}></div>
                            <div className={styles.navSeporator}></div>
                            <div className={styles.navSeporator}></div>
                            <div className={styles.navSeporator}></div>
                            <div className={styles.navSeporator}></div>
                        </div>
                    </div>
                    <div className={styles.navLinkBox}>
                        <a className={styles.navLink} href='https://www.pdireserves.com/index.php?id=5'>RESERVE STUDIES</a>
                        <div className={styles.navSeporatorBox}>
                            <div className={styles.navSeporator}></div>
                            <div className={styles.navSeporator}></div>
                            <div className={styles.navSeporator}></div>
                            <div className={styles.navSeporator}></div>
                            <div className={styles.navSeporator}></div>
                        </div>
                    </div>
                    <div ref={dropdownRef} onMouseOver={()=>{ setAboutDropdown(true) }} 
                        onMouseLeave={()=>{
                            setAboutDropdown(false)
                            setDropdownLinkColor({blog: '#0F263A', team: '#0F263A'})
                        }} className={styles.navLinkDropDownBox}>
                        <div  className={styles.navLinkBox}>
                            <a className={styles.navLink} href='https://www.pdireserves.com/index.php?id=13'>ABOUT US</a> 
                            <div className={styles.navSeporatorBox}>
                                <div className={styles.navSeporator}></div>
                                <div className={styles.navSeporator}></div>
                                <div className={styles.navSeporator}></div>
                                <div className={styles.navSeporator}></div>
                                <div className={styles.navSeporator}></div>
                            </div>
                        </div>
                        {
                            !aboutDropdown
                            ?
                            null
                            :
                            <div className={styles.navDropdown} style={{left: dropdownPosition-30}}>
                                <div className={styles.dropdownBufferBox}></div>
                                <a className={styles.navDropdownLink} href="https://www.pdireserves.com/index.php?id=14">
                                    <div className={styles.navDropdownLinks}>
                                            OUR TEAM
                                    </div>
                                </a>
                                <a className={styles.navDropdownLink} href="https://pdireserves.com/index.php?id=28">
                                    <div className={styles.navDropdownLinks}>
                                        OUR BLOG
                                    </div>
                                </a>
                            </div>
                        }
                        </div>
                        <div className={styles.navLinkBox}>
                            <a className={styles.navLink} href='https://www.pdireserves.com/index.php?id=27'>CONTACT US</a>         
                        </div>            
                    </div>
            :
                <MainAuthNav />
            }
        </>
        :
        <div className={styles.navBarBox}>
            {
            windowData.width<550
            ?
            <a href="https://pdireserves.com">
                <img alt="logo" className={styles.mobileLogo} src="/Logo.png" />
            </a>
            :
            <div className={styles.requestReserveBtnBox}>
                <ReserveBtn btnText="REQUEST A QUOTE"/>

            </div>
            }
            {
            windowData.width<550
            ?
            <div className={styles.mobileMenuNavBarBox} style={{left: windowData.width-80}}>
                {
                !hasRef
                ?
                null
                :
                <MobileMenu menuSelections={menuLinks!} width="100vw" navRef={navRect!}/>
                }
            </div>
            :
            <div className={styles.mobileMenuNavBarBox}>
                {
                !hasRef
                ?
                null
                :
                <MobileMenu menuSelections={menuLinks!} width="100vw" navRef={navRect!}/>
                }
            </div>
            }
        </div>
    }
    </nav>
  )
}

export default NavBar