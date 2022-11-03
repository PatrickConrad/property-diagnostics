import { useRouter } from 'next/router'
import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react'
import FullScreenImage from '../../../../../components/reusable/fullScreenImage';
import { mockProperties } from '../../../../../data/mockProperties';
import ImageLayout from '../../../../../layouts/_imagePageLayout';
import FullScreen from '../../../../../modals/FullScreenPortal'
import { NextPageWithLayout } from '../../../../_app';

const PictureId: NextPageWithLayout = () => {
    const router = useRouter();
    const [image, setImage] = useState<HTMLImageElement>()
    const [imgComp, setImgComp] = useState<ReactNode>()
    const onClose = () => {
      const routes = window.location.pathname.split('/')
      routes.pop()
      routes.pop()
      console.log(routes.join('/'));
      router.push(`${routes.join('/')}`)
      return;
    }
    const DomRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        let timeoutId: any;
        if(!router.isReady || !router.query.pictureId || !router.query.propertyId || router.query.pictureId === undefined) return;
        const { propertyId, pictureId} = router.query;
        const property = mockProperties.find(p=>p.id === propertyId)
        const pic = property?.images.propertyImages.find(i=>i.id===pictureId)
        const image = new Image()
        image.src = pic?.src!;
        setImage(image);
        console.log(router.query);
        timeoutId = setTimeout(()=> {
          console.log("TimeOut");
          setImgComp(<FullScreenImage onClose={onClose} image={image} domRef={DomRef}/>)
        }, 1000)
        return ()=>{
          setImage(undefined)
          clearTimeout(timeoutId)
          setImgComp(undefined)
        }
    }, [router.isReady])
  return !image || image===undefined || !image.src
  ?
  (
    <>
        {
            !router.isReady
            ?
            <h3>Image loading...</h3>
            :
            <h3>Image not found</h3>
        
        }
    </>
  )
  :
  (
    <>
    {
      !imgComp || !router.isReady || !router.query.pictureId || router.query.pictureId === undefined || !router.query.propertyId || router.query.propertyId === undefined
      ?
      null
      :
      <FullScreen close={()=>onClose()}>
          <img src={image.src} width= {window.innerWidth*.85} height={(image.height/image.width)*window.innerWidth*.85} />
      </FullScreen>
    }
    </>
  )
}

export default PictureId

PictureId.getLayout = function getLayout(page: ReactElement) {
  return (
      <ImageLayout>
          {page}
      </ImageLayout>
  )
}