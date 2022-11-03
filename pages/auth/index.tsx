import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect, useMemo, useState } from 'react'
import {helpers} from '../../helpers';
import HandlePageAccess from '../../helpers/PageWrapper';
import Layout from '../../layouts/_setLayout';
import { ContextConsumer } from '../../state/rootContext';
import { ITestAuth } from '../../types/authState';
import { NextPageWithLayout } from '../_app';

let pageUrl: Location;

interface Err {
  hasError: boolean,
  message: string
}

const Home: NextPageWithLayout  = () => {
    const {state, actions} = useContext(ContextConsumer);
    const [error, setError] = useState<Err>({
      hasError: false,
      message: ''
    })
    const router = useRouter();
    useEffect(()=>{
        console.log(state);
        pageUrl = window.location;  
        console.log({router});      
        return;
    }, [])
    const authData = useMemo(()=>{
      const data = state.auth.data as ITestAuth;
      return data
    }, [state.auth.data])
    const logout = async () =>{
      try{
        console.log({authData});
        await actions.auth?.logout();
        console.log({authData});
        return router.push('/');
      } 
      catch(err: any){
        console.log({err});
      }
    }

  return (
    <>
      <h1>My Account</h1>
      <button onClick={()=>logout()}>Logout</button>
    </>
  )
}


export default Home


Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    );
}  
