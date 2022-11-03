import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect, useMemo } from 'react'
import Layout from '../../layouts/_setLayout'
import { ContextConsumer } from '../../state/rootContext';
import { ITestAuth } from '../../types/authState';
import { NextPageWithLayout } from '../_app'

const Admin: NextPageWithLayout = () => {
    const {state, actions} = useContext(ContextConsumer);
    const router = useRouter()
    const authData = useMemo(()=>{
      const data = state.auth.data as ITestAuth;
      return data;
    }, [state.auth.data])
  
    useEffect(()=>{
      console.log({authData});
      if(authData.roles.includes('admin')){
        // router.push('/admin/properties')
        return;
      }
      return;
    }, [])
  return (
    <div>Admin Panel</div>
  )
}

export default Admin

Admin.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    );
}  