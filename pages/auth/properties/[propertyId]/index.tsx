import { useRouter } from 'next/router'
import React, { ChangeEvent, ReactElement, useContext, useEffect, useState } from 'react'
import Link from 'next/link';
import { mockProperties } from '../../../../data/mockProperties'
import Layout from '../../../../layouts/_setLayout'
import { IMember, IProperty, IUser, PropertyImage } from '../../../../types/dataTypes'
import { NextPageWithLayout } from '../../../_app'
import pageStyles from '../../../../styles/Pages/Auth/property.module.css'
import { setMonthName } from '../../../../helpers/dates'
import { setImage } from '../../../../helpers/setImage'
import { ContextConsumer } from '../../../../state/rootContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faPenToSquare, faSave } from '@fortawesome/free-solid-svg-icons'
import { ITestAuth } from '../../../../types/authState';
import { groups } from '../../../../data/groups';
import { users } from '../../../../data/users';
import { SetImagesDrop, SetImagesSlider } from '../../../../components/reusable/imageOverflows';

const Property: NextPageWithLayout = () => {
    const {state, actions} = useContext(ContextConsumer);
    const [property, setProperty] = useState<IProperty>();
    const [mainImage, setMainImage] = useState<JSX.Element>();
    const [edit, setEdit] = useState<boolean>(false);
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [creatingGroup, setCreatingGroup] = useState<boolean>(false);
    const [groupName, setGroupName] = useState<string>();
    const [addingMember, setAddingMember] = useState<boolean>(false);
    const [newMember, setNewMember] = useState<string>();
    const [searchUsers, setSearchUsers] = useState<IUser[]>();
    const [showMore, setShowMore] = useState<boolean>(false)
    const [dataWidth, setDataWidth] = useState<number>();
    const [imageHover, setImageHover] = useState<boolean>(false);
    const [moreInfo, setMoreInfo] = useState<boolean>(false);
    const [mobileDirectionColor, setMobileDirectionColor] = useState<{left: string, right: string}>({left: 'white', right: 'white'});
    const [imgSrc, setImgSrc] = useState<PropertyImage>()

    const router = useRouter()
    useEffect(()=>{
        if(!router.isReady) return;
        const authData = state.auth.data as ITestAuth;
        if(authData.roles.includes('admin') || authData.roles.includes('owner')) setCanEdit(true);
        const p = mockProperties.find(p=>p.id===router.query.propertyId)
        const pImages = p?.images.propertyImages
        if(p?.owners.includes(authData.id)) setIsOwner(true);
        const group = groups.find(g=> g.name===p?.group)
        console.log(group);
        console.log(group?.members.filter(m=>m.id===authData.id))
        console.log(p?.owners.includes(authData.id))
        if(!authData.roles.includes('admin') && !authData.roles.includes('owner') && !groups.find(g=> g.name===p?.group)!.members.find(m=>m.id===authData.id) && !p!.owners.includes(authData.id)){
            router.push('/auth')
            return;
        }
        setProperty(p);
        const width = window.innerWidth>1000?window.innerWidth*.7:window.innerWidth*.85;
        setDataWidth(width)
        const propt = mockProperties.find(p=>p.id===router.query.propertyId)!
        const proptMainImg = !propt.images || propt.images === undefined || !propt.images.mainImage || propt.images.mainImage === undefined ? '/noImage.png' : propt.images.mainImage
        if(!imgSrc || imgSrc===undefined){
            setImgSrc({id: '-1', src: proptMainImg, location: 'main', date: new Date, caption: 'Main Image'})
        }
        setMainImage(<img src={!imgSrc || imgSrc ===undefined ? proptMainImg : imgSrc.src} width={width} height={width/2.28 } alt={!imgSrc || imgSrc===undefined?"Main Property Image":imgSrc.location + ': '+imgSrc.caption}/>)
        return ()=>{
            const propty = p!
            propty.images.propertyImages= pImages!
            setProperty(propty)
        }
    }, [router.query, state.window.data, imgSrc])


    const addNewGroup = () => {
        if(!property || property === undefined) return;
        property.group = groupName;
        groups.push({id: `${parseInt(groups[groups.length-1].id)+1}`, name: groupName!, members: []})
        setCreatingGroup(false);
    }

    const addGroupMember = () => {
        if(!property || property === undefined) return;
        const group = groups.find(g=>g.name===property.group);
        const member: IMember = {id: newMember!, status: 'pending'}
        group?.members.push(member);
        setAddingMember(false);
    }

    const findUsers = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMember(e.target.value)
        setSearchUsers(users.filter(u=>u.email.includes(e.target.value)))
    }

    const onChangeMainImage = (side: string) => {
        const setupMainImage: PropertyImage = {
            src: property?.images.mainImage!,
            id: '-1',
            caption: 'Main Image',
            location: 'main',
            date: new Date()
        }
        
        const propertyImages: PropertyImage[] = property?.images.propertyImages!.map(i=> {return i})!;
        if(propertyImages[0].id !== '-1'){
            propertyImages.unshift(setupMainImage);
        }
        const currentIndex = propertyImages.map(i=>{
            if(i.id===imgSrc!.id){
                return propertyImages.indexOf(i)
            }
            return -4
        }).filter(i=>i!==-4)[0]!
        if(propertyImages[currentIndex].id === propertyImages[propertyImages.length-1].id && side==='right'){
            console.log('test2');
            
            setImgSrc(propertyImages[0])
        }
        if(propertyImages[currentIndex].id === propertyImages[0].id && side==='left'){
            console.log('test4');

            setImgSrc(propertyImages[propertyImages.length-1])
        }
        if((propertyImages[currentIndex].id === propertyImages[0].id || propertyImages[currentIndex].id !== propertyImages[propertyImages.length-1].id) && side==='right'){
            const newImg = currentIndex+1
            console.log(propertyImages);
            console.log(propertyImages[2]);
            setImgSrc(propertyImages[newImg])
        }
        if(propertyImages[currentIndex].id !== propertyImages[0].id && side==='left'){
            console.log('test3');
            setImgSrc(propertyImages[currentIndex-1])
        }
        
    }

  return (
    <div className={pageStyles.pageBody}>
        {
        !router.isReady||!property||property===undefined
        ?
        <h1>Loading...</h1>
        :
        <>
            <div onClick={()=>setEdit(!edit)} className={pageStyles.editBtn} style={{right: (window.innerWidth -window.innerWidth*.85)/2}}>
                    {
                        !canEdit
                        ?
                        null
                        :
                        edit
                        ?
                        <FontAwesomeIcon icon={faSave} className={pageStyles.editIcon}/>
                        :
                        <FontAwesomeIcon icon={faPenToSquare} className={pageStyles.editIcon}/>
                    }
            </div>
            <h2 className={pageStyles.pageHeader}>{property.address}</h2>
            <h4 className={pageStyles.pageSecondaryHeader}>{`${property.city}, ${property.state} ${property.zip}`}</h4>
            {
                window.innerWidth <=750
                ?
                null
                :
                <div className={pageStyles.inspectionDatesBox} style={{width: `${dataWidth}px`}}>
                    <div className={pageStyles.inspectionDateBox}>
                        <div className={pageStyles.inspectionType}>Last inspected: </div>
                        <div className={pageStyles.inspectionDate}>{`${setMonthName(property.lastInspectionDate.getMonth())} ${property.lastInspectionDate.getDay()}, ${property.lastInspectionDate.getFullYear()}`}</div>
                    </div>
                    <div className={pageStyles.inspectionDateBox}>
                        <div className={pageStyles.inspectionType}>Next inspection: </div>
                        <div className={pageStyles.inspectionDate}>{`${setMonthName(property.scheduledInspectoinDate.getMonth())} ${property.scheduledInspectoinDate.getDay()}, ${property.scheduledInspectoinDate.getFullYear()}`}</div>
                    </div>
                </div>
            }
            {
                moreInfo
                ?
                <div className={pageStyles.mainImageContainer}>
                    {
                        !mainImage || mainImage === undefined
                        ?
                        <div className={pageStyles.mainImageLoadingBox} style={{width: `${window.innerWidth*.85}px`, height: `${(window.innerWidth*.85)/2.28}`, border: '.1px solid lightgray'}} />
                        :
                        window.innerWidth <= 750
                        ?
                        <div  onMouseOver={()=>setImageHover(true)} onMouseLeave={()=>setImageHover(false)} className={pageStyles.mobileImageBox} style={{width: dataWidth}}>
                            <div className={pageStyles.mobileImageBoxOverlay} id={pageStyles.mobileImageBoxOverlayLeft}>

                            </div>
                            {mainImage} 
                        </div>
                        :
                        mainImage
                    }
                </div>
                :
                <div className={pageStyles.mainImageContainer}>
                    {
                        !mainImage || mainImage === undefined
                        ?
                        <div className={pageStyles.mainImageLoadingBox} style={{width: `${window.innerWidth*.85}px`, height: `${(window.innerWidth*.85)/2.28}`, border: '.1px solid lightgray'}} />
                        :
                        window.innerWidth <= 750 && property.images && property.images.propertyImages
                        ?
                        <div   onMouseOver={()=>setImageHover(true)} onMouseLeave={()=>setImageHover(false)} className={pageStyles.mobileImageBox} style={{width: dataWidth}}>
                            {
                                !imageHover
                                ?
                                null
                                :
                                <div  onClick={()=>onChangeMainImage('left')} onMouseOver={()=>setMobileDirectionColor({...mobileDirectionColor, left: '#F05B23'})} onMouseLeave={()=>setMobileDirectionColor({...mobileDirectionColor, left: 'white'})} className={pageStyles.mobileImageBoxOverlay} id={pageStyles.mobileImageBoxOverlayLeft}>
                                    <FontAwesomeIcon icon={faAngleLeft}  className={pageStyles.mobileImageDirectionIcon} style={{color: mobileDirectionColor.left}}/>
                                </div>
                            }
                            {mainImage} 
                            {
                                !imageHover
                                ?
                                null
                                :
                                <div onClick={()=>onChangeMainImage('right')} onMouseOver={()=>setMobileDirectionColor({...mobileDirectionColor, right: '#F05B23'})} onMouseLeave={()=>setMobileDirectionColor({...mobileDirectionColor, right: 'white'})} className={pageStyles.mobileImageBoxOverlay} id={pageStyles.mobileImageBoxOverlayRight}>
                                    <FontAwesomeIcon icon={faAngleRight}  className={pageStyles.mobileImageDirectionIcon} style={{color: mobileDirectionColor.right}}/>
                                </div>
                            }                       
                        </div>
                        :
                        mainImage
                    }
                </div>
            }
            {
                window.innerWidth <=750
                ?
                <div className={pageStyles.inspectionDatesBox}>
                    <div className={pageStyles.inspectionDateBox}>
                        <div className={pageStyles.inspectionType}>Last inspected: </div>
                        <div className={pageStyles.inspectionDate}>{`${setMonthName(property.lastInspectionDate.getMonth())} ${property.lastInspectionDate.getDay()}, ${property.lastInspectionDate.getFullYear()}`}</div>
                    </div>
                    <div className={pageStyles.inspectionDateBox}>
                        <div className={pageStyles.inspectionType}>Next inspection: </div>
                        <div className={pageStyles.inspectionDate}>{`${setMonthName(property.scheduledInspectoinDate.getMonth())} ${property.scheduledInspectoinDate.getDay()}, ${property.scheduledInspectoinDate.getFullYear()}`}</div>
                    </div>
                </div>
                :
                null
            }
            {
                !property || window.innerWidth<=750 || !property.images || !property.images.propertyImages
                ?
                null
                :
                <SetImagesSlider imgURL={`${router.pathname.split('/').filter(p=>!p.startsWith('[')).join('/')}/${property.id}/images`} widthLimit={ dataWidth! } images={property.images.propertyImages!} path={`${router.pathname.split('/').filter(p=>!p.startsWith('[')).join('/')}/${property.id}`}/>
            }
            <div className={pageStyles.messageAndGroupBox}>
                <div className={pageStyles.messagesContainter}>
                    <h5 className={pageStyles.messagesTitleBox}>Messages</h5>
                    <div className={pageStyles.messagesBox}>
                        <div className={pageStyles.messages}>
                        </div>
                    </div>
                </div>
                {
                    (!property.group || !groups.find(g=>g.name===property.group))&& isOwner
                    ?
                    <>
                        {
                            creatingGroup
                            ?
                            null
                            :
                            <div className={pageStyles.createGroupBtnBox}>
                                <button className={pageStyles.createGroupBtn}>Create Group</button>
                            </div>
                        }
                        {
                            !creatingGroup
                            ?
                            null
                            :
                            <div className={pageStyles.createGroupBox}>
                                <div className={pageStyles.groupForm}>
                                    <div className={pageStyles.groupFormGroup}>
                                        <div className={pageStyles.groupFormLabelBox}>
                                            <label htmlFor="groupName" className={pageStyles.groupFormLabel}>Name: </label>
                                        </div>
                                        <div className={pageStyles.groupFormInputBox}>
                                            <input type="text" onChange={e=>setGroupName(e.target.value)} name="groupName" className={pageStyles.groupFormInput} placeholder="Group name..."/>
                                        </div>
                                    </div>
                                    <div className={pageStyles.groupFormSubmitBtnBox}>
                                        <div onClick={()=>addNewGroup()} className={pageStyles.groupFormSubmitBtn}>Add Group</div>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                    :
                    <div className={pageStyles.groupBox}>
                        <div className={pageStyles.groupName}>{property.group}</div>
                        <div className={pageStyles.groupMembersListBox}>
                            {
                                groups.find(g=>g.name=== property.group)!.members.length<1 || groups.find(g=>g.name=== property.group)!.members === undefined
                                ?
                                null
                                :
                                groups.find(g=>g.name === property.group)?.members.map(m=>{
                                    const user = users.find(u=>u.id===m.id)?.email;
                                    return (
                                        <div className={pageStyles.groupMemberIdentifier} key={m.id}>
                                            {user}
                                        </div>
                                    )
                                })
                            }
                            {
                                !isOwner || addingMember
                                ?
                                null
                                :
                                <div className={pageStyles.addGroupMemberBtnBox}>
                                    <button onClick={()=>setAddingMember(true)} className={pageStyles.addGroupMemberBtn}>Add Member</button>
                                </div>
                            }
                            {
                                !isOwner || !addingMember
                                ?
                                null
                                :
                                <div className={pageStyles.addingGroupMemberBox}>
                                    <div className={pageStyles.groupMemberForm}>
                                        <div className={pageStyles.groupMemberFormGroup}>
                                            <div className={pageStyles.groupMemberFormLabelBox}>
                                                <label htmlFor="groupName" className={pageStyles.groupMemberFormLabel}>Name: </label>
                                            </div>
                                            <div className={pageStyles.groupFormInputBox}>
                                                <input type="text" onChange={e=>findUsers(e)} name="groupName" className={pageStyles.groupMemberFormInput} placeholder="Member email..."/>
                                            </div>
                                        </div>
                                        
                                        {
                                            newMember === undefined || !newMember || newMember === '' || !searchUsers || searchUsers === undefined
                                            ?
                                            null
                                            :
                                            <div className={pageStyles.findMemberSearchBox}>
                                                {
                                                    searchUsers.map(u=>{
                                                        return (
                                                            <div key={u.id} className={pageStyles.searchUser}>{u.email}</div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                        <div className={pageStyles.groupFormSubmitBtnBox}>
                                            <div onClick={()=>addGroupMember()} className={pageStyles.groupMemberFormSubmitBtn}>Add Member</div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
            <h3 className={pageStyles.reportHeader}>Reserve Study</h3>
            {
                property.reports === undefined || !property.reports || property.reports.length<1
                ?
                <div className={pageStyles.noReportBox}>
                    <p className={pageStyles.noReport}>No report has been conducted for this property. {property.scheduledInspectoinDate?'A full report will be conducted following your scheduled inspection on '+`${setMonthName(property.scheduledInspectoinDate.getMonth())} ${property.scheduledInspectoinDate.getDay()}, ${property.scheduledInspectoinDate.getFullYear()}.`: 'Schedule an inspection to recieve a full reserve report.'}</p>
                </div>
                :
                <div className={pageStyles.reserveReportBox}>
                    <div className={pageStyles.previousReportsBox}>
                        {
                            property.reports.map(r=>{
                                return (
                                    <div key={r.date} className={pageStyles.previousReportYearBox}>
                                        <p>{`${setMonthName(r.date.getMonth())} ${r.date.getDay()}, ${r.date.getFullYear}`}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
        }
    </div>
  )
}

export default Property

Property.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    );
  }