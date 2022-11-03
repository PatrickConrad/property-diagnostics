import { SetImagesDrop, SetImagesSlider } from "../reusable/imageOverflows"
import Link from 'next/link'

import styles from '../../styles/Pages/Auth/properties.module.css'
import { useContext, useEffect, useRef, useState } from "react"
import { IProperty } from "../../types/dataTypes"
import { ContextConsumer } from "../../state/rootContext"
import { IHeader, IWindow } from "../../types/window"
import { setMonthName } from "../../helpers/dates"
import { useRouter } from "next/router"

interface PropertyItemProps {
    p: IProperty,
}

const PropertyItem = (props: PropertyItemProps) => {
    const { p } = props;
    const {state, actions} = useContext(ContextConsumer);

    const [headerData, setHeaderData] = useState<IHeader>({height: 200})
    const [showMore, setShowMore] = useState<boolean>(false)

    const propertyInfoRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    useEffect(()=>{
        const headerInfo = state.header.data as IHeader;
        setShowMore(false);
        setHeaderData(headerInfo);
        return;
    }, [state.header.data, state.window.data])
    return (
        <div style={{height: window.innerWidth<750 && !showMore?`95vh` : 'fit-content' }}  className={styles.propertiesListItem}>
        <div ref={propertyInfoRef} className={styles.propertyInfoContainer}>
            <Link key={p.id} href={{pathname:`/auth/properties/[propertyId]`, query: {propertyId: `${p.id}`}}}>
            <a className={styles.linkToProperty}>
                <div className={styles.linkContainer}>
                <div className={styles.propertyAddressBox}>
                    {
                    window.innerWidth>750
                    ?
                    <h4 className={styles.propertyAddress}>{`${p.address} ${p.city}, ${p.state} ${p.zip}`}</h4>
                    :
                    <h4 className={styles.propertyAddress}>{`${p.address}`}</h4>
                    }
                </div>
                {
                    window.innerWidth>750
                    ?
                    null
                    :
                    <div className={styles.propertyLocationBox}>
                    <h5 className={styles.locationInfo}>{`${p.city}, ${p.state} ${p.zip}`}</h5>
                    </div>
                }
                
                {
                    !p.group
                    ?
                    null
                    :
                    <div className={styles.propertyGroupBox}>
                    <p className={styles.propertyGroup}>Group: {p.group}</p>
                    </div>
                }
                </div>
            </a>
            </Link>
            {

            <div className={styles.propertyInfoUnderline}></div>
            }
            <div className={styles.inspectionDatesBox}>
            <div className={styles.inspectionDatesContainer}>
                <div className={styles.inspectionDateBox} id={styles.lastInspectionDateBox}>
                {
                    !p.lastInspectionDate
                    ?
                    <p className={styles.inspectionDateType}>No Prior Inspection</p>
                    :
                    <>
                    <p className={styles.inspectionDateType}>Last inspected:</p>
                    <p className={styles.inspectionDate} id={styles.lastInspectionDate}>{`${setMonthName(p.lastInspectionDate.getMonth())} ${p.scheduledInspectoinDate.getDay()}, ${p.scheduledInspectoinDate.getFullYear()}`}</p>
                    </>
                }
                </div>
                <div className={styles.inspectionDateBox} id={styles.scheduledInspectoinDateBox}>
            
                {
                !p.scheduledInspectoinDate
                ?
                    <a className={styles.scheduleNewInspectionLink}>Add Inspection</a>
                :
                    <>
                    <p className={styles.inspectionDateType}>Next inspected:</p>
                    <p className={styles.inspectionDate} id={styles.scheduledInspectoinDate}>{`${setMonthName(p.scheduledInspectoinDate.getMonth())} ${p.scheduledInspectoinDate.getDay()}, ${p.scheduledInspectoinDate.getFullYear()}`}</p>
                    </>
                
                }
                </div>
            </div>
            </div>
        </div>
        
        {
            window.innerWidth>750
            ?
            <SetImagesSlider imgURL={`${router.pathname}/${p.id}/images`} widthLimit={.9*window.innerWidth} images={p.images.propertyImages} path={`${router.pathname}?property=${p.id}`}/>
            :
            <SetImagesDrop images={p.images.propertyImages} heightLimit={window.innerHeight - (window.innerHeight*.05) - propertyInfoRef.current?.getBoundingClientRect().height! - 20 } showMore={showMore} setShowMore={setShowMore} imgURL={`${router.pathname}/${p.id}/images`} path={`${router.pathname}?property=${p.id}`}/>
        }

        </div>
    )

}

export default PropertyItem