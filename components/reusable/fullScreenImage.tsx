import { useRouter } from 'next/router'
import React from 'react'
import FullScreen from '../../modals/FullScreenPortal'

interface FullScreenImageProps {
    image: HTMLImageElement,
    onClose: ()=> void,
    domRef: React.RefObject<HTMLDivElement>
}
const FullScreenImage = (props: FullScreenImageProps) => {
    const {image, onClose, domRef} = props;
    return (
        <div style={{height: '100vh', width: '100vw', backgroundColor: 'white'}}>
            <FullScreen close={()=>onClose()} domRef={domRef}>
                <img src={image.src} width= {window.innerWidth*.85} height={(image.height/image.width)*window.innerWidth*.85} />
            </FullScreen>
        </div>
    )
}

export default FullScreenImage