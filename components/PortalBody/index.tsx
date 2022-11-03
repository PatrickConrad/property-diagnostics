import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NextComponentType } from 'next';
import Login from './Login';

type Verifications = 'biometrics' | 'phone' | 'email' | 'app' | 'none'
type Portal = 'login' | 'verify';
interface ErrorType {
    hasError: boolean;
    message?: string;
    position?: number
}

const PortalBody: NextComponentType = () => {
    const [error, setError] = useState<ErrorType>({
        hasError: false,
        message: '',
    });
    const [portal, setPortal] = useState<Portal>('login')
    const router = useRouter();

    useEffect(()=>{
        // if(!router.query) return;
        const portalType = router.query.portal as Portal;
        if(!portalType || portalType === 'login') {setPortal('login')}
        if(portalType === 'verify') {setPortal('verify')}
        if(portalType !== 'verify' && portalType !== 'login' && (portalType !== undefined || portalType !== null) ) {
            return setError({hasError: true, message: 'Portal type does not exist'})
        }
        return;
    }, [router.query])

  return (
    <>
        <Login/>
    </>
  )
}

export default PortalBody