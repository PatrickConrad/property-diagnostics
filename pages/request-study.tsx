import Link from 'next/link'
import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { stateAbbriviations, usStates } from '../data/geophraphic'
import setLayout from '../helpers/setLayout'
import Layout from '../layouts/_setLayout'
import styles from '../styles/Pages/requestQuote.module.css'
import { UsState } from '../types/dataTypes'

interface Contact {
  name: string,
  email: string,
  phone: string
}

interface Company {
  name?: string,
  website?: string,
  address?: string,
  suite?: string,
  city?: string,
  state?: string,
  zip?: string,
  country?: string
}

interface PropertyRequest {
  name: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  contact: Contact,
  company?: Company
}

interface InputErrors {
  name: boolean,
  address: boolean,
  city: boolean,
  state: boolean,
  zip: boolean,
  contactName: boolean,
  contactEmail: boolean,
  contactPhone: boolean,
  form: boolean

}

const RequestStudy = () => {
  const [property, setProperty] = useState<PropertyRequest>({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  })
  const [emailError, setEmailError] = useState<boolean>(false);
  const [websiteError, setWebsiteError] = useState<boolean>(false);
  const [zipError, setZipError] = useState<boolean>(false);
  const [stateSelectionError, setStateSelectionError] = useState<boolean>(false);
  const [propertyState, setPropertyState] = useState<string>('');
  const [stateSearch, setStateSearch] = useState<boolean>(false);
  const [matchStates, setMatchStates] = useState<UsState[]>(usStates);
  const [companyZipError, setCompanyZipError] = useState<boolean>(false);
  const [companyStateSelectionError, setCompanyStateSelectionError] = useState<boolean>(false);
  const [companyState, setCompanyState] = useState<string>('');
  const [companyStateSearch, setCompanyStateSearch] = useState<boolean>(false);
  const [countrySelectionError, setCountrySelectionError] = useState<boolean>(false);
  const [countryState, setCountryState] = useState<string>('');
  const [countrySearch, setCountrySearch] = useState<boolean>(false);
  const [countriesList, setCountriesList] = useState<string[]>();
  const [allCountriesList, setAllCountriesList] = useState<string[]>();
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    name: false,
    address: false,
    city: false,
    state: false,
    zip: false,
    contactName: false,
    contactEmail: false,
    contactPhone: false,
    form: false
  })

  useEffect(()=>{
    setCountries()
  }, [])

  const searchCountry = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setCountryState(e.target.value)
    setCountrySelectionError(false)
    if(e.target.value !== ''&& e.target.value !== undefined&&countryState!== e.target.value){
      setCountrySearch(true)
      const matched = allCountriesList!.filter(c=>c.toLowerCase().includes(e.target.value.toLowerCase()))
      setCountriesList(matched)
      return;
    }
    setCountrySearch(false)
    return;
  }

  const checkIfCountryMatch = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(()=>{
      const myCountry = e.target.value;
        const match = allCountriesList!.find(c=>c.toLowerCase()===myCountry.toLowerCase())
        setCountrySearch(false)
        setCountrySelectionError(false);
        if(!match){
          setCountrySelectionError(true);
          return 'Please enter a valid state name'
        }
        const company = property.company??{}
        if(company.country!==myCountry){
          company.country = myCountry
          setProperty({...property, company})
        }
        return;
      }, 100)
  }

  const setCountries = async() => {
    try{
    const data = await fetch('https://restcountries.com/v3.1/all')
    if(!data){
      console.log("Server Error: no data");
    }
    const resp = await data.json() as []
    console.log({resp});
    const setCountries = (r: any)=>{
      return r.name.common
    }
    const countryNames = resp.map(r=>setCountries(r)).sort()
    setAllCountriesList(countryNames)
    console.log({countryNames});
    }
    catch(err: any){
      console.log({err});
    }
  }

  const searchState = (e: React.ChangeEvent<HTMLInputElement>, searchType?: "company"|"property")=> {
    if(searchType!== undefined && searchType!==null && searchType==='company'){
      setCompanyStateSelectionError(false);
      setCompanyState(e.target.value)
      if(e.target.value !== ''&& e.target.value !== undefined&&companyState!== e.target.value){
        setCompanyStateSearch(true)
        const matched = stateAbbriviations.filter(s=>s[0].toLowerCase().includes(e.target.value.toLowerCase()) || s[1].includes(e.target.value.toUpperCase()))
        const filtered = matched.map(m=>{return m[0]})
        setMatchStates(filtered)
        return;
      }
      setCompanyStateSearch(false)
      return;
    }
    
    setStateSelectionError(false);
    setPropertyState(e.target.value)
    if(e.target.value !== ''&& e.target.value !== undefined&&propertyState!== e.target.value){
      setStateSearch(true)
      const matched = stateAbbriviations.filter(s=>s[0].toLowerCase().includes(e.target.value.toLowerCase()) || s[1].includes(e.target.value.toUpperCase()))
      const filtered = matched.map(m=>{return m[0]})
      setMatchStates(filtered)
      return;
    }
    setStateSearch(false)
    return;
  }

  const checkIfMatch = (e: React.FocusEvent<HTMLInputElement>, searchType?: "company"|"property") => {
    setTimeout(()=>{
      const myState = e.target.value;
        const match = stateAbbriviations.find(s=>s[0].toLowerCase()===myState.toLowerCase() || s[1]===myState.toUpperCase())
        if(searchType!== undefined && searchType!==null && searchType==='company'){
          setCompanyStateSearch(false)
          setCompanyStateSelectionError(false);
          if(!match){
            setCompanyStateSelectionError(true);
            return 'Please enter a valid state name'
          }
          if(match[1]!==myState){
            setCompanyState(match[1])
          }
          if(property.company?.state!==match[1]){
            const company = property.company!;
            company.state = match[1]
            setProperty({...property, company})
          }
          return;
        }
        setStateSearch(false)
        setStateSelectionError(false);
        if(!match){
          setStateSelectionError(true);
          return 'Please enter a valid state name'
        }
        if(match[1]!==myState){
          setPropertyState(match[1])
        }
        if(property.state!==match[1]){
          setProperty({...property, state: match[1]})
        }
        return;
      }, 100)
  }

  const setZip = (e: React.ChangeEvent<HTMLInputElement>, zipType?: "company"|'property')=>{
    if(zipType!==undefined&&zipType!==null && zipType==="company"){
      setCompanyZipError(false)
    }
    else{
      setZipError(false)
    }
    const regex = /[0-9]/
    const zip = e.target.value
    if((zip.length>0&&!regex.test(zip[zip.length-1])||zip.length>5) ){
      return;
    }
    if(zipType!==undefined&&zipType!==null && zipType==="company"){
      const company = {...property.company, zip}
      return setProperty({...property, company});

    }
    else{
      return setProperty({...property, zip});
    }
    //use api to match the state
    
  }

  const checkZip = (e: React.FocusEvent<HTMLInputElement>, zipType?: "company"|'property')=>{
    if(zipType!==undefined&&zipType!==null && zipType==="company"){
      setCompanyZipError(false)
    }
    else{
      setZipError(false)
    }
    const zip = e.target.value
    if((zip.length<5 || zip.length>5)&&zipType!==undefined&&zipType!==null && zipType==="company"){
      return setCompanyZipError(true)}
    if((zip.length<5 || zip.length>5)&&(zipType===undefined||zipType===null || zipType==="property")){
      return setZipError(true)
    }
    //use api to match the state
    
  }

  const submitForm = () => {
    if(zipError || stateSelectionError || emailError){
      setInputErrors({...inputErrors, form: true});
      return;
    }
    console.log({property1: property});
    const formErrs = {...inputErrors}
    if(!property.name || property.name === '') {
      console.log("no match"); 
      formErrs.name= true
    }
    if(!property.address || property.address === '') formErrs.address= true;
    if(!property.city || property.city === '') formErrs.city= true;
    if(!property.state || property.state === '') formErrs.state= true;
    if(!property.zip || property.zip === '') formErrs.zip= true;
    if(!property.contact.name || property.contact.name === '') formErrs.contactName= true;
    if(!property.contact.email || property.contact.email === '') formErrs.contactEmail= true;
    if(!property.contact.phone || property.contact.phone === '') formErrs.contactPhone = true;
    if(!formErrs.name && !formErrs.address && !formErrs.city && !formErrs.state && !formErrs.zip && !formErrs.contactName && !formErrs.contactEmail && !formErrs.contactPhone){
      console.log({property});
      console.log({inputErrors});
      setInputErrors({...inputErrors, form: false})
    }

    else{
      formErrs.form = true
      setInputErrors(formErrs)
      return;
    }
  }

  useEffect(()=>{
    console.log({inputErr: inputErrors});
  }, [inputErrors])
  return (
   <>
     <div className={styles.pageTitleBox}>
       <h1>Request A Reserve Study</h1>      
     </div>
     <div className={styles.pageMap}>
      <p><Link href='https://pdireserves.com/'><a>Home</a></Link> {`>`} Request A Reserve Study</p>
     </div>
    <div className={styles.reserveStudyBody}>
      <div className={styles.reserveStudyFormTitleBox}>
        <h2>FILL OUT BELOW FORM TO REQUEST A QUOTE</h2>
        <div className={styles.titleUnderline}/>
      </div>
      <div className={styles.reserveStudyFormContainer}>
        <div className={styles.formBox}>
          <div className={styles.requiredSection}>
            <h4>Property Information</h4>
            <form>
              <div className={styles.reserveStudyFormGroup}>
                <label>Name of Property</label> 
                <input style={{border: !inputErrors.name?'none':'2px solid red'}} value={property.name} onChange={(e)=>{
                  setInputErrors({...inputErrors, name: false})
                  setProperty({...property, name: e.target.value})
                }} type="text" placeholder='Property Name'/>
                {
                  !inputErrors.name
                  ?
                  null
                  :
                  <p>Property name is required</p>
                }
              </div>
              <div className={styles.doubleLineFormGroup}>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Physical Street Address</label> 
                  <input style={{border: !inputErrors.address?'none':'2px solid red'}} value={property.address} onChange={(e)=>{
                    setInputErrors({...inputErrors, address: false})
                    setProperty({...property, address: e.target.value})
                  }} type="text" placeholder='Street Address'/>
                  {
                    !inputErrors.address
                    ?
                    null
                    :
                    <p>Property street address is required</p>
                  }
                </div>
                <div className={styles.reserveStudyFormGroup}>
                  <label>City</label> 
                  <input style={{border: !inputErrors.city?'none':'2px solid red'}} value={property.city} onChange={(e)=>{
                    setInputErrors({...inputErrors, city: false})
                    setProperty({...property, city: e.target.value})
                  }} type="text" placeholder='City'/>
                  {
                    !inputErrors.city
                    ?
                    null
                    :
                    <p>Property city is required</p>
                  }
                </div>
              </div>
              <div className={styles.doubleLineFormGroup}>
                <div className={styles.reserveStudyFormGroup}>
                  <label>State</label> 
                  <input 
                    style={{border: !stateSelectionError&&!inputErrors.state?'none':'2px solid red'}} 
                    onBlur={(e)=>{checkIfMatch(e)}} 
                    autoComplete="new-user-select-state-of-property" 
                    value={propertyState} 
                    onChange={e=>{
                      setInputErrors({...inputErrors, state: false})
                      searchState(e)
                    }} 
                    type="text" 
                    placeholder='State'
                  />
                  {
                    stateSearch
                    ?
                    <div className={styles.dropdownSelection}>
                      {
                        matchStates.map(s=>{
                          return (
                            <div key={s} className={styles.suggestionListItem} onClick={()=>{
                              const postal = stateAbbriviations.find(sA=> sA[0]===s)![1];
                              setPropertyState(postal);
                              setStateSearch(false);
                              return setProperty({...property, state: postal});
                            }}>
                              {s}
                            </div>
                          )
                        })
                      }
                    </div>
                    :
                    stateSelectionError
                    ?
                    <p>Please enter a valid state</p>
                    :
                    inputErrors.address
                    ?
                    <p>Property state is required</p>
                    :
                    null
                  }
                </div>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Zip Code</label> 
                  <input 
                    style={{border: !zipError&&!inputErrors.zip?'none':'2px solid red'}} 
                    value={property.zip} onBlur={(e)=>{checkZip(e)}} 
                    onChange={(e)=>{
                      setInputErrors({...inputErrors, zip: false})
                      setZip(e)
                    }} 
                    type="text" 
                    placeholder='Zip Code'
                  />
                  {
                    zipError
                    ?
                    <p>Zip code must be a{property.zip.length<5?" minimum ":" maximum "}of five digits</p>
                    :
                    inputErrors.zip
                    ?
                    <p>Property zip code is required</p>
                    :
                    null
                  }
                </div>
              </div>
              <div className={styles.doubleLineFormGroup}>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Contact Person</label> 
                  <input style={{border: !inputErrors.contactName?'none':'2px solid red'}} value={property.contact.name} onChange={(e)=>{
                    setInputErrors({...inputErrors, contactName: false})
                    const contact = {...property.contact, name: e.target.value};
                    setProperty({...property, contact})}
                  } type="text" placeholder='Name of Contact'/>
                  {
                    !inputErrors.contactName
                    ?
                    null
                    :
                    <p>Property contact person is required</p>
                  }
                </div>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Contact Email</label> 
                  <input
                    style={{border: !emailError&&!inputErrors.contactEmail?'none':'2px solid red'}} 
                    value={property.contact.email} 
                    onBlur={(e)=>{
                      const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
                      if(!regex.test(e.target.value)){
                        setEmailError(true);
                        return;
                      }
                      setEmailError(false)
                      return
                    }}
                    onChange={(e)=>{
                      setInputErrors({...inputErrors, contactEmail: false})
                      setEmailError(false)
                      const contact = {...property.contact, email: e.target.value};
                      setProperty({...property, contact})}
                    } 
                    type="email" 
                    placeholder='Contact Email'
                  />
                  {
                    !emailError
                    ?
                    null
                    :
                    <p>Please enter a valid email</p>
                  }
                  {
                    !inputErrors.contactEmail
                    ?
                    null
                    :
                    <p>Property contact email is required</p>
                  }
                </div>
              </div>
                <div className={styles.reserveStudyFormGroup} id={styles.reserveStudyFormPhoneGroup}>
                  <label>Contact Phone Number</label> 
                  {/* <div className={styles.reserveStudyCountryCodeBox}>
                    <div className={styles.reserveStudyCountryCodeSelectionBox}>+1</div>
                    {

                    }
                  </div> */}
                  <input style={{border: !inputErrors.contactPhone?'none':'2px solid red'}}  value={property.contact.phone} onChange={(e)=>{
                    setInputErrors({...inputErrors, contactPhone: false})
                    const contact = {...property.contact, phone: e.target.value};
                    setProperty({...property, contact})}
                  } type="tel" placeholder='Example (555-555-5555)'/>
                  {
                    !inputErrors.contactPhone
                    ?
                    null
                    :
                    <p>Property contact phone number is required</p>
                  }
                </div>
            </form>
          </div>
          <div className={styles.optionalSection}>
            <h4>Company Information (Optional)</h4>
            <div className={styles.doubleLineFormGroup}>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Name of Company</label> 
                  <input value={property.company?.name} onChange={(e)=>{
                    const company = {...property.company, name: e.target.value}
                    setProperty({...property, company})
                  }} type="text" placeholder='Company Name'/>
                </div>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Company Website</label> 
                  <input 
                    style={{border: websiteError?'2px solid red':'none'}}
                    value={property.company?.website} 
                    onBlur={(e)=>{
                      if(e.target.value.startsWith('http://')||e.target.value.startsWith('https://')){
                        setWebsiteError(false)
                        return;
                      }
                      setWebsiteError(true)
                      return;
                    }} 
                    onChange={(e)=>{
                      setWebsiteError(false)
                      const company = {...property.company, website: e.target.value}
                      setProperty({...property, company})
                    }} 
                    type="text" 
                    placeholder='https://example.com'
                  />
                  {
                    !websiteError
                    ?
                    null
                    :
                    <p>Please enter a valid URL</p>
                  }
                </div>
              </div>
              <div className={styles.doubleLineFormGroup}>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Company Street Address</label> 
                  <input value={property.company?.address} onChange={(e)=>{
                    const company = {...property.company, address: e.target.value}
                    setProperty({...property, company})
                  }} type="text" placeholder='Company Street Address'/>
                </div>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Apt, Suite, Bldg.</label> 
                  <input value={property.company?.suite} onChange={(e)=>{
                    const company = {...property.company, suite: e.target.value}
                    setProperty({...property, company})
                  }} type="text" placeholder='Apt, Suite, Bldg.'/>
                </div>
              </div>

              <div className={styles.doubleLineFormGroup}>
                <div className={styles.reserveStudyFormGroup}>
                  <label>City</label> 
                  <input value={property.company?.city} onChange={(e)=>{
                    const company = {...property.company, city: e.target.value}
                    setProperty({...property, company})
                  }} type="text" placeholder='City'/>
                </div>
                <div className={styles.reserveStudyFormGroup}>
                  <label>Country</label> 
                  <input style={{border: !countrySelectionError?'none':'2px solid red'}} value={countryState} onChange={(e)=>{searchCountry(e)}} type="text" placeholder='Country' onBlur={(e)=>{checkIfCountryMatch(e)}} autoComplete="new-user-select-country-of-property"/>
                  {
                    countrySearch
                    ?
                    <div className={styles.dropdownSelection}>
                      {
                        countriesList!.map(c=>{
                          return (
                            <div key={c} className={styles.suggestionListItem} onClick={()=>{
                              const setCountry = allCountriesList!.find(sC=> sC===c)!;
                              setCountryState(setCountry);
                              setCountrySearch(false);
                              const setCompany = property.company;
                              return setProperty({...property, company: {...setCompany, country: setCountry}});
                            }}>
                              {c}
                            </div>
                          )
                        })
                      }
                    </div>
                    :
                    countrySelectionError
                    ?
                    <p>Please enter a valid country</p>
                    :
                    null
                  }
                </div>
                
              </div>
              {
                property.company?.country===undefined || !property.company?.country || property.company?.country?.toLowerCase() !== "united states" || countrySelectionError
                ?
                null
                :
                <div className={styles.doubleLineFormGroup}>
                  <div className={styles.reserveStudyFormGroup}>
                    <label>State</label> 
                    <input  style={{border: !companyStateSelectionError?'none':'2px solid red'}} onBlur={(e)=>{checkIfMatch(e, 'company')}} autoComplete="new-user-select-state-of-property" value={companyState} onChange={e=>{searchState(e, 'company')}} type="text" placeholder='State'/>
                    {
                      companyStateSearch
                      ?
                      <div className={styles.dropdownSelection}>
                        {
                          matchStates.map(s=>{
                            return (
                              <div key={s} className={styles.suggestionListItem} onClick={()=>{
                                const postal = stateAbbriviations.find(sA=> sA[0]===s)![1];
                                setCompanyState(postal);
                                setCompanyStateSearch(false);
                                const company = {...property.company, state: postal}
                                return setProperty({...property, company});
                              }}>
                                {s}
                              </div>
                            )
                          })
                        }
                      </div>
                      :
                      companyStateSelectionError
                      ?
                      <p>Please enter a valid state</p>
                      :
                      null
                    }
                  </div>
                  <div className={styles.reserveStudyFormGroup}>
                    <label>Zip Code</label> 
                    <input style={{border: companyZipError?'2px solid red':'none'}} value={property.company.zip} onBlur={(e)=>{checkZip(e, 'company')}} onChange={(e)=>{setZip(e, 'company')}} type="text" placeholder='Zip Code'/>
                  {
                    !companyZipError
                    ?
                    null
                    :
                    <p>Zip code must be a{property.company.zip!.length<5?" minimum ":" maximum "}of five digits</p>
                  }
                  </div>
                </div>
              }
          </div>
          <button onClick={()=>submitForm()}>Submit</button>
          {
            !inputErrors.form
            ?
            null
            :
            <p>Please fix highlighted errors before submitting.</p>
          }
        </div>
        <aside className={styles.formInformationBox}>
          <p>We use an industry standard 128-Bit SSL encryption, ensuring all of your personal and property information remains secure and private!</p>
          <img src='/apra.png' width='100%' />
          <img src='/CommunityMember.png' width='100%' />
        </aside>
      </div>
    </div>
   </>
  )
}

export default RequestStudy

RequestStudy.getLayout = function getLayout(page: ReactElement) {
    return setLayout(page, 'Request a Study - Property Diagnostics Inc.')
} 