import { useRouter } from 'next/router'
import React, { ReactElement, useContext, useEffect, useMemo, useRef, useState } from 'react'
import Layout from '../../../layouts/_setLayout'
import { ContextConsumer } from '../../../state/rootContext'
import { ITestAuth } from '../../../types/authState'
import { NextPageWithLayout } from '../../_app'
import styles from '../../../styles/Pages/Auth/properties.module.css'
import { IHeader, IWindow } from '../../../types/window'
import SearchBar from '../../../components/reusable/SearchBar'
import { SearchData, SearchFilter, SearchParams } from '../../../types/searchTypes'
import { IProperty, IUser } from '../../../types/dataTypes'
import { mockProperties } from '../../../data/mockProperties'
import Link from 'next/link'
import { setMonthName } from '../../../helpers/dates'
import { SetImagesDrop } from '../../../components/reusable/imageOverflows'
import PropertyItem from '../../../components/Properties/PropertyItem'
import { groups } from '../../../data/groups'


const searchParams: SearchParams = {
  dataTypes: ['properties'] as SearchData[],
  filterFields: ['city', 'zip', 'address', 'state', 'id', 'group'] as SearchFilter[]
}

const MyProperties: NextPageWithLayout = () => {
  const {state, actions} = useContext(ContextConsumer)
  const [pageHeight, setPageHeight] = useState<number>(400)
  const [results, setResults] = useState<(IUser|IProperty)[]>([])
  const [headerData, setHeaderData] = useState<IHeader>({height: 200})
  const [showMore, setShowMore] = useState<boolean>(false)
  const [showMoreBtn, setShowMoreBtn] = useState<boolean>(false)
  const [imageSpace, setImageSpace] = useState<number>(110)
  const [propertyResultsHeight, setPropertyResultsHeight] = useState<string>('80vw')

  useEffect(()=>{
    const headerInfo = state.header.data as IHeader;
    setHeaderData(headerInfo);
    const windowData = state.window.data as IWindow;
    const pageHeight = windowData.height-headerInfo.height!
    setPageHeight(pageHeight)
    return ()=> {
      setHeaderData({})
      setPageHeight(NaN)
    };
}, [state.header.data, state.window.data])

  const router = useRouter()
  const authData = useMemo(()=>{
    const data = state.auth.data as ITestAuth;
    return data;
  }, [state.auth.data])

  const propertyInfoRef = useRef<HTMLDivElement>(null)


  const setProperties = () => {
    let propertyResults: IProperty[] = []
    if((!authData.roles.includes('admin')||!authData.roles.includes('owner'))&&(!results||results===undefined||results.length<1)){
      propertyResults=mockProperties.filter(p=>p.owners.includes(authData.id))
      const groupMemberProperties: IProperty[] = mockProperties.filter(p=>groups.find(g=> g.name===p.group)?.members.find(m=>m.id===authData.id))
      console.log({groupMemberProperties});
      propertyResults = propertyResults.concat(...groupMemberProperties);
    } 

    console.log({propertyResults});
    // if((!authData.roles.includes('admin')||!authData.roles.includes('owner'))&&(results&&results.length>0)){
    //   const res = results as IProperty[];
    //   propertyResults=results.filter(p=>p.owners.includes(authData.id))
    // }
    if((authData.roles.includes('admin')||authData.roles.includes('owner'))&&(!results||results===undefined||results.length<1)){
      propertyResults=mockProperties
    }
    return propertyResults.map(p=>{
      return (
          <PropertyItem p={p} key={p.id}/>
      )
    })
  }


return (

    <div className={styles.propertiesPageBody}>
      <div className={styles.propertiesTitleBox}>
        <h1 className={styles.propertiesTitle}>Properties</h1>
      </div>
      <div className={styles.propertiesTitleUnderline}></div>
      <div style={{marginBottom: '20px'}} className={styles.propertiesSearchBarBox}>
        <SearchBar mobile={400} setResults={setResults} searchParams={searchParams}/> 
      </div>
      <div className={styles.propertiesListBox}>
        {
          setProperties()
        }
      </div>
    </div>
  )
}
export default MyProperties

MyProperties.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
          {page}
      </Layout>
  );
}