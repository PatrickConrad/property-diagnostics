import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { ContextConsumer } from '../state/rootContext';
import { ITestAuth } from '../types/authState';
import setWindowDimensions from './_setWindowDimensions';

interface Props {
    children: ReactNode
}
const AuthProvider = ({ children }: Props) => {
    const {state, actions} = useContext(ContextConsumer);
    const [authChecked, setAuthChecked] = useState<boolean>(false)
    const [expires, setExpires] = useState<number>()

    setWindowDimensions()

    const router = useRouter()
    const authData = useMemo(()=>{
        const data = state.auth.data as ITestAuth
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

    useEffect(()=>{

        console.log("CHECKING COOKIES");
        const hasAccess = getCookie('hasAccess') as string;
        const hasClient = getCookie('client') as string;
        console.log({hasClient});
        if(!hasAccess || !hasClient || parseInt(hasAccess)<Date.now()) {
            console.log("NO COOKIES");
            clearAuth();
            return;
        }
        console.log("cookies work");
        updateAuth(hasClient);
        setExpires(parseInt(hasAccess));
        setAuthChecked(true);
        console.log("Auth set");
        console.log({state, actions});
    }, [router.pathname])
  
    return (
        <> 
            {children}
        </>
    )
}

export default AuthProvider