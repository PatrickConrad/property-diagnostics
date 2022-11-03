import { faBars, faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ContextConsumer } from '../../state/rootContext'
import styles from '../../styles/reusableComponents/mobileMenu.module.css'
import { ITestAuth } from '../../types/authState'
import { IHeader, IWindow } from '../../types/window'
import { MySelection } from '../../types/menu'



interface Props {
    menuSelections: MySelection[],
    menuClass?: string,
    width?: string,
    navRef: DOMRect
}

interface SubProps {
    selection: MySelection
    menuClass?: string,
    width: string,
    windowWidth: number,
    setMenuOpen: (isOpen: boolean)=> void;
}

interface SubMenuProps {
    menuSelections: MySelection[],
    menuClass?: string,
    width: string,
    windowWidth: number,
    pos: DOMRect,
    setMenuOpen: (isOpen: boolean)=> void;
}

interface MenuStyle{
    width: string, 
    top?: number, 
    left?: number,
    backgroundColor?: string
}

interface RegularLinkProps {
    s: MySelection, type: "ext" | "int", 
    menuClass: string, 
    width: string, 
    setMenuOpen: (isOpen: boolean)=> void;
}

const MobileSubMenu = (props: SubMenuProps) => {
    const { menuSelections, width, setMenuOpen} = props;
    const menuClass = props.menuClass?`${props.menuClass}MobileSubMenu`:'mobileSubMenu';
    const router = useRouter()
    
    const onLinkClick = (href: string) =>{
        setMenuOpen(false)
        router.push(href)
    }

    return (
        <div style={{width}} className={styles[`${menuClass}Box`]}>
            {
                menuSelections.map(s=>{
                    const type = s.types??'int'
                    const key=menuSelections.indexOf(s)
                    return (
                        <div key={key} style={{width}} className={styles[`${menuClass}SelectionLinkBox`]}>
                                {
                                    type === 'ext'
                                    ?
                                        <a className={styles[`${menuClass}SelectionLink`]} href={s.href!}>{s.name}</a>
                                    :
                                    <div onClick={()=>onLinkClick(s.href!)}className={styles[`${menuClass}SelectionLink`]}>{s.name}</div>

                                }                               
                        </div>
                    )
                })
            }
        </div>
    )
}

const RegularMenuLink = (props: RegularLinkProps) => {
    const router = useRouter()
    const {width, menuClass, s, type, setMenuOpen} = props
    const {state, actions} = useContext(ContextConsumer);
    const authData = useMemo(()=>{
        const data = state.auth.data as ITestAuth;
        return data
    }, [state.auth.data])
    const logoff = async () => {
        try{
            await actions.auth?.logout()
        }
        catch(err: any){
            console.log({err});
        }
    }
    const onAuthClick = () => {
        console.log("clicked");
        setMenuOpen(false)
        if(authData.isAuth) {
            logoff()
        }
        router.push('/')  
    }

    const onLinkClick = (href: string) =>{
        setMenuOpen(false)
        router.push(href)
    }
    
    return (
        <div style={{width}} className={styles[`${menuClass}SelectionLinkBox`]}>
            {
                s.name === "LOGOFF"
                ?
                    <div onClick={()=>onAuthClick()}className={styles[`${menuClass}SelectionLink`]}>LOGOFF</div>
                :
                s.name === "SIGN-IN"
                ?
                    <div onClick={()=>onAuthClick()}className={styles[`${menuClass}SelectionLink`]}>SIGN-IN</div>
                :
                type === 'ext'
                ?
                    <a className={styles[`${menuClass}SelectionLink`]} href={s.href!}>{s.name}</a>
                :
                    <div onClick={()=>onLinkClick(s.href!)}className={styles[`${menuClass}SelectionLink`]}>{s.name}</div>
            }
        </div>
)}

const SubMenuLink = (props: SubProps) => {
    const {state, actions} = useContext(ContextConsumer);
    const [selectionRect, setSelectionRect] = useState<DOMRect>()
    const linkRef = useRef<HTMLDivElement>(null)
    const {selection, windowWidth, setMenuOpen} = props
    const menuClass = props.menuClass?`${props.menuClass}MobileMenuWithSub`:'mobileMenuWithSub'
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const type = selection.types??'int';
    const router = useRouter()
    const onLinkClick = (href: string) =>{
        setMenuOpen(false)
        router.push(href)
    }

    useEffect(()=>{
        setSelectionRect(linkRef.current?.getBoundingClientRect())
    }, [state.window.data])
    return (
        <div style={{width: props.width}} ref={linkRef} className={styles[`${menuClass}SelectionLinkBox`]}>
            <div className={styles[`${menuClass}LinkBox`]}>
            {
            !selection.href
            ?
                    <div className={styles[`${menuClass}SelectionLink`]}>
                        {selection.name}
                    </div>
            :
            type === 'ext'
            ?
                    <a className={styles[`${menuClass}SelectionLink`]} href={selection.href!}>
                        {selection.name}
                    </a>
            :
                <div onClick={()=>onLinkClick(selection.href!)}className={styles[`${menuClass}SelectionLink`]}>{selection.name}</div>
            } 
                <div onClick={()=>setIsOpen(!isOpen)} className={styles[`${menuClass}DropdownIconBox`]}>
                    <FontAwesomeIcon className={styles[`${menuClass}DropdownIcon`]} style={{width: '13px'}} icon={!isOpen?faCaretDown:faCaretUp} />
                </div>
            </div>
            {
                !isOpen
                ?
                null
                :
                <MobileSubMenu windowWidth={windowWidth} width={props.width} menuSelections={selection.subMenu!} menuClass={props.menuClass??''} pos={selectionRect!} setMenuOpen={setMenuOpen}/>
            }
        </div>
        
)}

const MobileMenu = (props: Props) => {
    const {state, actions} = useContext(ContextConsumer);
    const { menuSelections } = props;
    const menuClass = props.menuClass?`${props.menuClass}MobileMenu`:'mobileMenu'
    // const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const windowData = useMemo(()=>{
        const data = state.window.data as IWindow;
        return data
    }, [state.window.data])
    const setMenuOpen = async(menuOpen: boolean) => {
        try{
            await actions.header?.setMenuState({menuOpen})
        }
        catch(err: any){
            console.log(err);
        }
    }
    const authData = useMemo(()=>{
        const data = state.auth.data as ITestAuth;
        return data
    }, [state.auth.data])
    const menuOpen = useMemo(()=>{
        const data = state.header.data as IHeader
        return data.menuOpen
    }, [state.header.data])
    const menuIconRef = useRef<HTMLDivElement>(null)
    const menuSize = props.width && (props.width === 'fullscreen' || props.width === '100vw')? windowData.width: props.width && props.width.includes('vw') ? (parseInt(props.width.split('vw')[0])/100)*windowData.width : windowData.width*.3
    const width = `${menuSize}px`
    const menuStyle = menuSize >= windowData.width ? {top: +props.navRef.height, left: 0, width}: {top: +props.navRef.height, width}

    const setAuthPages = (s: MySelection) => {
        if(authData.isAuth && s.name !== 'LOGOFF') {
            s.href=`/auth${s.href}`
            return s
        }
        if(s.types==='admin') {
            s.href=`/admin${s.href}`
            return s
        }
        if((s.name==='PROPERTIES' || s.name==='HOME') && authData.roles.includes('admin')) {
            s.href=`/admin${s.href}`
            return s
        }
        if(s.name==='LOGOFF') {
            s.href= `/`
            return s;
        }
        return s;

    }
    return (
        <div style={{width}} className={styles[`${menuClass}Box`]} 
            onClick={()=>{
                if(!menuOpen){
                    setMenuOpen(true)
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                }
                return;
            }}>
            <div ref={menuIconRef} className={styles[`${menuClass}IconBox`]} >
                <FontAwesomeIcon style={{marginRight: '30px'}} className={styles[`${menuClass}Icon`]} icon={!menuOpen?faBars:faXmark} onClick={()=>{
                    setMenuOpen(false)}}/>
            </div>
            {
                !menuOpen
                ?
                null
                :
                <div className={styles[`${menuClass}DropdownBox`]} style={{...menuStyle}}>
                    {
                        menuSelections.map(s=>{
                            const key=menuSelections.indexOf(s)
                            if(s.types==='admin' && !authData.roles.includes('admin')) return;
                            const type = !s.types?'int':s.types==='admin'?'int':'ext'
                            return s.subMenu && s.subMenu.length > 0 ? <SubMenuLink key={key} selection={s} menuClass={props.menuClass??''} width={width} windowWidth={windowData.width} setMenuOpen={setMenuOpen}/>: <RegularMenuLink s={s} type={type} menuClass={menuClass} width={width} key={key} setMenuOpen={setMenuOpen}/>
                        })
                    }
                </div>
            }
        </div>
    )
}

export default MobileMenu