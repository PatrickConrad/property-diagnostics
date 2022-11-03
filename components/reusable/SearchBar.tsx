import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useContext, useMemo, useRef, useState } from 'react'
import { ContextConsumer } from '../../state/rootContext'
import styles from '../../styles/ReusableComponents/Search/searchBar.module.css'
import { SearchParams } from '../../types/searchTypes'

//testing imports only
import {mockProperties} from '../../data/mockProperties'
import {users} from '../../data/users'
import { IProperty, IUser } from '../../types/dataTypes'
import { Role } from '../../types/authState'
import { IWindow } from '../../types/window'

type StandardSearchResults = (IUser | IProperty)[] 
interface SearchBarProps {
    searchParams: SearchParams,
    setResults: (results: StandardSearchResults) => void,
    mobile?: number
}

const SearchBar = (props: SearchBarProps) => {
    const {searchParams, setResults, mobile} = props;
    const inputRef = useRef<HTMLInputElement>(null)
    const {state, actions} = useContext(ContextConsumer);
    const [searchText, setSearchText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const checkData = async (phrase: string) => {
        try {
            //await actions.search.checkData(phrase, searchParams)
        }
        catch(err: any){
            console.log(err);
        }
    }
    const windowData = useMemo(()=>{
        const data = state.window.data as IWindow;
        return data
    }, [state.window.data])
    const searchData = (e: ChangeEvent<HTMLInputElement>) => {
        const propResults: IProperty[] = []
        const userResults: IUser[] = []
        setSearchText(e.target.value)    
        if(searchParams.dataTypes.includes('users')){

            if(searchParams.filterFields.includes('email')){
                const filtered = users.filter(u=>{
                    u.email.includes(e.target.value)
                })
                const setUsers: IUser[] = filtered.map(f=>{
                    f.password = ''
                    return f
                })
                userResults.concat(setUsers)
            }
            if(searchParams.filterFields.includes('firstName')){
                const filtered = users.filter(u=>{
                    u.firstName.includes(e.target.value)
                })
                const setUsers: IUser[] = filtered.map(f=>{
                    f.password = ''
                    return f
                })
                userResults.concat(setUsers)
            }
            if(searchParams.filterFields.includes('lastName')){
                const filtered = users.filter(u=>{
                    u.lastName.includes(e.target.value)
                })
                const setUsers: IUser[] = filtered.map(f=>{
                    f.password = ''
                    return f
                })
                userResults.concat(setUsers)
            }
            if(searchParams.filterFields.includes('id')){
                const filtered = users.filter(u=>{
                    u.id.includes(e.target.value)
                })
                const setUsers: IUser[] = filtered.map(f=>{
                    f.password = ''
                    return f
                })
                userResults.concat(setUsers)
            }
            if(searchParams.filterFields.includes('roles')){
                const filtered = users.filter(u=>{
                    const role = e.target.value as Role
                    u.roles.includes(role)
                })
                const setUsers: IUser[] = filtered.map(f=>{
                    f.password = ''
                    return f
                })
                userResults.concat(setUsers)
            }
        }
        if(searchParams.dataTypes.includes('properties')){
            console.log('properties');
            if(searchParams.filterFields.includes('owners')){
                propResults.concat(mockProperties.filter(p=>{
                    p.owners.includes(e.target.value)
            }))}
            if(searchParams.filterFields.includes('scheduledInspectoinDate')){
                propResults.concat(mockProperties.filter(p=>{
                    p.scheduledInspectoinDate === new Date(e.target.value)
            }))}
            if(searchParams.filterFields.includes('lastInspectionDate')){
                propResults.concat(mockProperties.filter(p=>{
                    p.lastInspectionDate === new Date(e.target.value);
            }))}
            if(searchParams.filterFields.includes('city')){
                propResults.concat(mockProperties.filter(p=>{
                    p.city.includes(e.target.value)
            }))}
            if(searchParams.filterFields.includes('zip')){
                propResults.concat(mockProperties.filter(p=>{
                    p.zip.includes(e.target.value)
            }))}
            if(searchParams.filterFields.includes('address')){
                console.log("address");
                console.log(mockProperties.filter(p=>{
                    p.address.includes(e.target.value)
                 }))
                propResults.concat(mockProperties.filter(p=>{
                    p.address.includes(e.target.value)
            }))}
            if(searchParams.filterFields.includes('state')){
                propResults.concat(mockProperties.filter(p=>{
                    p.state.includes(e.target.value)
            }))}
        
            if(searchParams.filterFields.includes('group')){
                propResults.concat(mockProperties.filter(p=>{
                    p.group?.includes(e.target.value)
            }))}
            if(searchParams.filterFields.includes('id')){
                propResults.concat(mockProperties.filter(p=>{
                    p.id.includes(e.target.value)
            }))}
        
        }

        const allResults: (IProperty | IUser)[] = [...propResults, ...userResults]
        console.log({allResults});
        setResults(allResults)
        
    }
    return (
        <div className={styles.searchBox}>
            <div className={styles.searchBarBox}>
            {
                !mobile || windowData.width>mobile
                ?
                <div className={styles.searchBar}>
                    
                        <div className={styles.searchBarIconBox}>
                            <FontAwesomeIcon onClick={()=>{inputRef.current?.focus()}} className={styles.searchBarIcon} icon={faMagnifyingGlass}/>
                        </div>
                        
                    {
                        !mobile || windowData.width>mobile
                        ?
                        <div className={styles.searchBarTextBox}>
                            <input placeholder={windowData.width<500?'Search...': `Search for ${searchParams.dataTypes.includes('properties')&&searchParams.dataTypes.includes('users')?'properties and users':searchParams.dataTypes.includes('properties')&&!searchParams.dataTypes.includes('users')?'properties':'users'} here...`} ref={inputRef} type='text' onChange={(e)=>searchData(e)} className={styles.searchBarText} />
                        </div>
                        :
                        null
                    }
                </div>
                :
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'none', width: '40px', height: '40px', borderRadius: '25px'}} className={styles.searchBarIconBox}>
                    <FontAwesomeIcon style={{padding: 'none', border: 'none', borderRadius: '25px', fontSize: '22px'}} onClick={()=>{inputRef.current?.focus()}} className={styles.searchBarIcon} icon={faMagnifyingGlass}/>
                </div>
            }
            </div>
            <div className={styles.setFilterBox}>
                <div>Add filters</div>
            </div>
        </div>
    )
}

export default SearchBar