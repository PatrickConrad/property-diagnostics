import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useEffect } from 'react'
import NavBar from '../components/Header/TitleBar'
import PortalBody from '../components/PortalBody'
import Layout from '../layouts/_setLayout'
import { ContextConsumer } from '../state/rootContext'
import { ITestAuth } from '../types/authState'
import { NextPageWithLayout } from './_app'
const Home: NextPageWithLayout = () => {
  const pageScroll = () => {
    window.scrollBy(0, 1); // horizontal and vertical scroll increments
  }

  useEffect(()=>{
      pageScroll()
  }, [])
  const {state, actions} = useContext(ContextConsumer);
  return (
    <div>
      <PortalBody/>
    </div>
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