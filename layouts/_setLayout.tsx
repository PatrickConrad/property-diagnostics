import Head from "next/head";
import { ReactElement, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import { ContextConsumer, ContextProvider } from '../state/rootContext'
import '@fortawesome/fontawesome-svg-core/styles.css'
import AuthProvider from "../helpers/authProvider";
import Footer from "../components/Footer";
import checkScroll from '../helpers/_checkScroll';
import styles from '../styles/Layouts/mainLayout.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAnglesUp } from '@fortawesome/free-solid-svg-icons'
import PageWrapper from "../helpers/PageWrapper";
interface LayoutProps {
    children: ReactNode,
    title?: string,
    description?: string,
}


const Layout = (props: LayoutProps) => {
  const {children} = props;
  const pageTitle = props.title??'PDI Client Portal'
  const pageDescription = props.description??"Authorization portal for Property Diagnostics clients"
  const [inView, setInView] = useState<boolean>(true);
  const [headerHeight, setHeaderHeight] = useState<number>(0)
  const backToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  checkScroll(setInView)

    return (
      <ContextProvider>
        <PageWrapper>
          <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <link rel="icon" href="https://pdireserves.com/wp-content/uploads/2021/09/favi.png" />
          </Head>
          <main>
            <div id='portal'/>
            <div style={{backgroundColor: 'white' , width: '100vw'}}>
              <Header setHeaderHeight={setHeaderHeight}/>
              <div className={styles.pageBody} >{children}</div>
            </div>
            {
              inView
              ?
              null
              :
              <div onClick={()=>backToTop()} className={styles.backToTopBtn}>
                <FontAwesomeIcon icon={faAnglesUp} className={styles.backToTopIcon} />
              </div>
            }
            
          </main>
          <Footer />
        </PageWrapper>
      </ContextProvider>
    )
  }

export default Layout