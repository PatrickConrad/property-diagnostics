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
    children: ReactNode
}


const ImageLayout = ({ children }: LayoutProps) => {

    return (
      <ContextProvider>
        <PageWrapper>
          <Head>
            <title>PDI Property Image</title>
            <meta name="description" content="Authorization portal for Property Diagnostics clients" />
            <link rel="icon" href="https://pdireserves.com/wp-content/uploads/2021/09/favi.png" />
          </Head>
          <main>
            <div id='portal' style={{zIndex: 3}}/>
            <div style={{backgroundColor: 'white' , width: '100vw', height: '100vh', zIndex: -10}}>{children}</div>
          </main>     
        </PageWrapper>
      </ContextProvider>
    )
  }

export default ImageLayout