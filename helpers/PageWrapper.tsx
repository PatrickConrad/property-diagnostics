import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { ContextConsumer } from '../state/rootContext';
import { IAccess } from '../types/accessTypes';
import { ITestAuth } from '../types/authState';
import setWindowDimensions from './_setWindowDimensions';


interface Props {
    children: ReactNode
}

const PageWrapper = ({children}: Props) => {
    setWindowDimensions()
    const {state, actions} = useContext(ContextConsumer);
    const [authChecked, setAuthChecked] = useState<boolean>(false)
    const [checking, setChecking] = useState<boolean>(false)
    const [expires, setExpires] = useState<number>()

    const router = useRouter();

    const authData = useMemo(()=>{
        const data = state.auth.data as ITestAuth;
        return data
    }, [state.auth.data])

    const clearAuth = async () => {
        try{
            console.log('clear auth');
            await actions.auth?.clearAuth()
        }
        catch(err: any){
            console.log({err});
        }
    }

    const updateAuth = async (clientId: string) => {
        try{
            console.log({clientId});
            await actions.auth?.updateAccess({identifier: clientId});
            return;
        }
        catch(err: any){
            console.log(err)
        }
    }

    const checkCookies = ()=>{

        console.log("CHECKING COOKIES");
        const hasAccess = getCookie('hasAccess') as string;
        const hasClient = getCookie('client') as string;
        console.log({hasClient});
        if(!hasAccess || !hasClient || parseInt(hasAccess)<Date.now()) {
            console.log("NO COOKIES");
            clearAuth();
            if(router.pathname.substring(1).startsWith('auth')|| router.pathname.substring(1).startsWith('admin')){
                router.push('/')
            }
            return;
        }
        console.log("cookies work");
        updateAuth(hasClient);
        setExpires(parseInt(hasAccess));
        setAuthChecked(true);
        console.log("Auth set");
        console.log({state, actions});
    }

    useEffect(() => {
        if(!authData.isAuth) {
            checkCookies();
            return;
        }
        console.log({afterCookieCheck: authData});
        router.beforePopState(({as}:{as: string}) => {
            let has = false
            if (authData.isAuth && as === '/') {
                router.push('/auth')
                has= false
            }
            if(!authData.isAuth && as.substring(1).startsWith('auth')){
                router.push('/')
                has = false
            }
            if(authData.isAuth && !authData.roles.includes('admin')&& as.substring(1).startsWith('admin')){
                router.push('/auth')
                has = false
            }
            if(!authData.isAuth && as.substring(1).startsWith('admin')){
                router.push('/')
                has = false
            }
            if(as==='/auth' && authData.roles.includes('admin')){
                router.push('/admin')
                has =  false;
            }
            has = true
            return has
        })
    }, [authData.isAuth])

    const checkIfAuthPage = () => {
        if(!router.isReady) {
            return null;
        }
        const page = router.pathname;
        console.log({page, query: router.query, auth: state.auth.data});
        if(page.substring(1).startsWith('auth') && !authData.isAuth){
            router.push('/')
        }
        if(page==='/auth' && authData.roles.includes('admin')){
            router.push('/admin')
        }
        if(page === '/' && authData.isAuth){
            router.push('/auth')
        }
        if(authData.isAuth && !authData.roles.includes('admin')&& page.substring(1).startsWith('admin')){
            router.push('/auth')
        }
        if(!authData.isAuth && page.substring(1).startsWith('admin')){
            router.push('/')
        }
        if(Object.keys(router.query).length === 0){
            router.push(page)
        }
        else{

            router.push({
                pathname: page,
                query: { ...router.query },
            });
        }
        return;
    }

    useEffect(()=>{
        if(!authData.isAuth) {
            checkCookies();
            return;
        }
        console.log({afterCookiesCheckNoBackBtn: authData});
        checkIfAuthPage();
        return;
    }, [router.pathname, router.isReady, authData.isAuth])

return (
    <>
        {children}
    </>
  )
}

export default PageWrapper