import { ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IProperty, PropertyImage } from "../../types/dataTypes";
import styles from '../../styles/Pages/Auth/properties.module.css'
import sliderStyles from '../../styles/ReusableComponents/Images/slider.module.css'
import { ContextConsumer } from "../../state/rootContext";
import { IWindow } from "../../types/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { setMonthName } from "../../helpers/dates";
import Image from "next/image";
import { setImage } from "../../helpers/setImage";
import Link from "next/link";
import { useRouter } from "next/router";
import setStyle from "../../helpers/styleSetter";
import FullScreen from "../../modals/FullScreenPortal";
import { mockProperties } from "../../data/mockProperties";
import fullScreenSliderStyles from '../../styles/ReusableComponents/Images/fullscreenSlider.module.css'
import { stringify } from "querystring";

interface DropdownOverFlowProps {
    images: PropertyImage[]
    heightLimit: number
    showMore: boolean
    setShowMore: (showMore: boolean)=> void;
    path: string,
    imgURL: string
}

interface SliderControlProps {
    images: PropertyImage[]
    widthLimit: string|number,
    imgWidth?: number,
    imgInfo?: boolean,
    path: string,
    imgURL: string
}

interface SliderFlowProps {
    imageArray: PropertyImage[]
    widthLimit: string|number,
    imgWidth?: number,
    imgInfo?: boolean,
    setFit: (fit: boolean)=> void;
    fit: boolean,
    // setLeftOverSpace: (space: number)=> void;
    path: string,
    imgURL: string

}

interface FullScreenSlider {
    images: PropertyImage[],
    onClose: ()=> void,
    path: string,
    imgURL?: string,
    imgId: string
}

export const SetImagesDrop = (props: DropdownOverFlowProps) => {
    const {images, heightLimit, showMore, setShowMore, path, imgURL} = props;
    const router = useRouter()
    const onClose = () => {
        router.push(router.pathname);
        return;
    }
    let imageLimit = false
    let occurance = 0
    return (
      <>
        <div className={styles.propertiesImageBox} style={{height: !showMore?`${heightLimit}px`:'fit-content'}}>
          <div  style={{height: !showMore?`${heightLimit}px`:'fit-content'}} className={styles.propertiesImageRotator}>
            {
              images.map((i)=>{
                  const img = setImage(i.src);
                  const showMoreImageSpace = heightLimit;
                  const space = showMoreImageSpace - (img.height - 10)*(images.indexOf(i)+1)
                  if(img.height>=space && !imageLimit){
                  imageLimit = true;
                  }
                  if(img.height>=space && imageLimit){
                  occurance++
                  } 
                  return(
                  <div key={i.id}>
                      {
                        router.query.property !== path.split('=')[1] || !router.query.property || router.query.property === undefined || !router.query.image || router.query.image === undefined
                        ?
                        null
                        :
                        <FullScreenSlider imgId={router.query.image as string} onClose={onClose} images={images} path={path} imgURL={imgURL} />

                      }
                      {
                      !showMore && imageLimit && occurance>1
                      ?
                      null
                      :
                      !showMore && imageLimit && img.height/4>space && occurance <=1
                      ?
                      <div key={i.id} className={styles.showMoreBtnBox}>
                          <button onClick={()=>setShowMore(true)} className={styles.showMoreBtn}>Show More</button>
                      </div>
                      :
                      !showMore && imageLimit && occurance === 1
                      ?
                      <div key={i.id} style={{alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: '0'}} className={styles.propertyImageContainer}>
                          <div style={{height: `${space-10}px`}} className={styles.propertyImageBlurredViewBox}>
                          <div onClick={()=>setShowMore(true)} style={{height: `${space-10}px`, width: `${img.width}px`, backgroundImage: `url(${img.src})`}}  className={styles.propertyImageBlurredView}>
                              <div className={styles.propertyImageBlurredViewShowMoreBtn}>Show More</div>
                          </div>
                          </div>
                      </div>
                      :
                      <div key={i.id} className={styles.propertyImageContainer}>
                        <Link href={`${path}${path.includes('?')?'&image='+i.id:'?image='+i.id}`} as={`${imgURL}/${i.id}`}>
                          <img alt={`${i.location??'location on'} ${i.caption??'property'}`} className={styles.propertyImage} src={img.src} />
                        </Link>
                      </div>
                      }
                  </div>
              )})}
          </div>
        </div>
        {
            !showMore
            ?
            null
            :
            <div className={styles.closeShowMoreBox}>
                <button onClick={()=>setShowMore(false)} className={styles.closeShowMoreBtn}>Show Less</button>
            </div>
        }
      </>
      )
    }

    export const SetImagesSlider = (props: SliderControlProps) => {
        const router = useRouter();
        const {state, actions} = useContext(ContextConsumer);
        const {images, widthLimit, path, imgURL} = props;
        const widthAfterBtns = typeof widthLimit === 'number' ? widthLimit-40 : widthLimit.includes('px') ? parseInt(widthLimit.split('px')[0])-40 : `${parseInt(widthLimit.split('vw')[0])-6}vw`
        const setWidth = props.imgWidth
        const imgInfo = props.imgInfo??false
        const [imageArray, setImageArray] = useState<PropertyImage[]>(images)
        const [rotateBtnColor, setRotateBtnColor] = useState<{left: string, right: string}>({left: 'white', right: 'white'})
        const [fit, setFit] = useState<boolean>(true)
        const [sliderBar, setSliderBar] = useState<ReactNode>(<SetImageBar imgURL={imgURL} path={path} imageArray={imageArray} imgWidth={setWidth} fit={fit} setFit={setFit} widthLimit={widthAfterBtns}/>)
        const imgBoxRef = useRef<HTMLDivElement>(null)
        const onClickRight = () => {
            const imgArray= imageArray
            const shifting = imgArray.shift()
            imgArray.push(shifting!)
            setImageArray(imgArray);
            const slider = <SetImageBar imgURL={imgURL} path={path} imageArray={imageArray} imgWidth={setWidth} fit={fit} setFit={setFit} widthLimit={widthAfterBtns}/>
            setSliderBar(slider)
        }

        const onClickLeft = () => {
            const imgArray= imageArray
            const popping = imgArray.pop()
            imgArray.unshift(popping!)
            setImageArray(imgArray);
            const slider = <SetImageBar imgURL={imgURL} path={path} imageArray={imageArray} imgWidth={setWidth} fit={fit} setFit={setFit} widthLimit={widthAfterBtns}/>
            setSliderBar(slider)
        }
       
        useEffect(()=>{
            const slider = <SetImageBar imgURL={imgURL} path={path} imageArray={imageArray} imgWidth={setWidth} fit={fit} setFit={setFit} widthLimit={widthAfterBtns}/>
            setSliderBar(slider)
            return ()=>setSliderBar(null)
        }, [state.window.data, fit, imageArray, setWidth, widthLimit])
        return (
            <>
               
                <div ref={imgBoxRef} className={sliderStyles.propertiesImageBox} style={{width: typeof widthLimit === 'number'? `${widthLimit}px`:widthLimit}}>
                    {
                        fit
                        ?
                        null
                        :
                        <div onClick={()=>onClickLeft()} onMouseOver={()=>setRotateBtnColor({...rotateBtnColor, left: '#F05B23'})} onMouseLeave={()=>setRotateBtnColor({...rotateBtnColor, left: 'white'})} id={sliderStyles.imgRotateBtnLeft} className={sliderStyles.imgRotateBtnBox}>
                            <div className={sliderStyles.imgRotateBtn}>
                                <div className={sliderStyles.imgRotateIconBox}>
                                    <FontAwesomeIcon style={{color: rotateBtnColor.left}} className={sliderStyles.imgRotateIcon} icon={faAngleLeft}/>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={sliderStyles.sliderBarBox}>{sliderBar}</div>
                    {
                        fit
                        ?
                        null
                        :
                        <div onClick={()=>onClickRight()} onMouseLeave={()=>setRotateBtnColor({...rotateBtnColor, right: 'white'})} onMouseOver={()=>setRotateBtnColor({...rotateBtnColor, right: '#F05B23'})} id={sliderStyles.imgRotateBtnRight} className={sliderStyles.imgRotateBtnBox}>
                            <div className={sliderStyles.imgRotateBtn}>
                                <div className={sliderStyles.imgRotateIconBox}>
                                    <FontAwesomeIcon style={{color: rotateBtnColor.right}} className={sliderStyles.imgRotateIcon} icon={faAngleRight}/>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </>
        )
    }

    export const SetImageBar = (props: SliderFlowProps) => {
        const { imageArray, widthLimit, setFit, fit, path, imgURL } = props;
        console.log({path, imgURL});
        const setWidth = props.imgWidth??0
        const imgInfo = props.imgInfo??false
        const router = useRouter()
        const onClose = () => {
            const routes = router.pathname.split('/')
            // router.push(`${routes.join('/')}`)
            router.push(router.pathname);
            return;
          }
        return (
          <>
                {
                    router.query.property !== path.split('=')[1] || !router.query.property || router.query.property === undefined || !router.query.image || router.query.image === undefined
                    ?
                    null
                    :
                    <FullScreenSlider imgId={router.query.image as string} onClose={onClose} images={imageArray} path={path} imgURL={imgURL} />
                }
              <div style={{height: 'fit-content'}} className={sliderStyles.propertiesImageSlider}>
                {
                  imageArray.map((i)=>{
                      const img = setImage(i.src);
                      const aR = img.naturalHeight/img.naturalWidth;
                      img.height = setWidth!==0?setWidth*aR:img.naturalHeight;
                      img.width = setWidth!==0?setWidth:img.naturalWidth;
                      img.height = setWidth!==0?setWidth*aR:img.naturalHeight;
                      img.width = setWidth!==0?setWidth:img.naturalWidth;
                      const showMoreImageSpace = typeof widthLimit=== 'number' ? widthLimit : widthLimit.includes('px') ? parseInt(widthLimit.split('px')[0]) : parseInt(widthLimit.split('vw')[0])/100*window.innerWidth;
                      const space = showMoreImageSpace - ((img.width + 10)*(imageArray.indexOf(i)+1))
                      if(img.width+10>space && fit){
                        setFit(false)
                      }
                      
                      return(
                      <div key={i.id}>
                        
                        {
                        
                          img.width+10>space && (!router.query.image|| !router.query.property || router.query.property === undefined || router.query.image === undefined)
                          ?
                          null
                          :
                          <div className={sliderStyles.propertyImageContainer}>
                              <Link href={`${path}${path.includes('?')?'&image='+i.id:'?image='+i.id}`} as={`${imgURL}/${i.id}`}>
                                <img alt={`${i.location??'location on'} ${i.caption??'property'}`} style={{height: img.height, width: img.width}} className={sliderStyles.propertyImage} src={img.src} />
                              </Link>
                              {
                                !imgInfo
                                ?
                                null
                                :
                                <div className={sliderStyles.imgInfoBox}>
                                    <div className={sliderStyles.imgCaptionBox}>
                                        <div className={sliderStyles.imgCaption}>{i.caption?i.caption:''}</div>
                                    </div>
                                    <div className={sliderStyles.imgLocationBox}>
                                        <div className={sliderStyles.imgLocation}>{i.location?i.location:''}</div>
                                    </div>
                                    {
                                        !i.date
                                        ?
                                        null
                                        :
                                        <div className={sliderStyles.imgDateBox}>
                                            <div className={sliderStyles.imgDate}>{`${setMonthName(i.date.getMonth())} ${i.date.getDay()}, ${i.date.getFullYear()}`}</div>
                                        </div>
                                    }
                                </div>

                              }
                          </div>
                        }
                      </div>
                  )})}
              </div>
                          
          </>
          )
        }


        const FullScreenSlider = (props: FullScreenSlider) => {
            const {images, onClose, path, imgURL, imgId} = props;
            const myImage = setImage(images.find(i=> i.id === imgId)!.src)
            const imageData = images.find(i=>i.id === imgId)!;
            const [imgSrc, setImgSrc] = useState<HTMLImageElement>(myImage)
            const [imageInfo, setImageInfo] = useState<{caption: string, date: Date, location: string}>({caption: imageData.caption, location: imageData.location, date: imageData.date})
            // const [fullScreenHover, setFullScreenHover] = useState<boolean>(false)
            // const [fullScreenSliderBtnColor, setFullScreenSliderBtnColor] = useState<{left: string, right: string}>({left: 'white', right: 'white'})
            // const onFullScreenImageRotate = (type: 'right'|'left') => {
            //     const matchedImage = images.map(i=>{
            //         if(i.id!==imgId) return -1;
            //         return images.indexOf(i)
            //     })!
            //     const currentIndex = matchedImage.filter(i=>i!==-1)[0]
            //     let imgUrl: {href: string, as?: string}; 
            //     if(type==='right'){
            //         if(images[currentIndex].id === images[images.length-1].id ){
            //             imgUrl={ href: `${path}&image=${images[0].id}`, as: `${imgURL}/${images[0].id}`}
            //             return imgUrl
            //         }
            //         imgUrl= {href: `${path}&image=${images[currentIndex+1].id}`, as: `${imgURL}/${images[currentIndex+1].id}`}
            //         return imgUrl

            //     }
            //     if(images[currentIndex].id === images[0].id ){
            //         imgUrl= {href:`${path}&image=${images[images.length-1].id}`, as: `${imgURL}/${images[images.length-1].id}`}
            //         return imgUrl
            //     }
            //     imgUrl= {href: `${path}&image=${images[currentIndex-1].id}`, as: `${imgURL}/${images[currentIndex-1].id}`}
            //     return imgUrl
                
            // } 
            return (
                <FullScreen close={onClose}>
                    <div className={sliderStyles.fullScreenImageBox}>    
                        <img src={imgSrc.src} width={window.innerWidth*.85} height={(imgSrc.height/imgSrc.width)*window.innerWidth*.85} className={fullScreenSliderStyles.fullScreenSliderImage}/>
                        {
                            !imageInfo.caption && !imageInfo.date && !imageInfo.location
                            ?
                            null
                            :
                            <div className={sliderStyles.imageInfo}>
                                {
                                    !imageInfo.date
                                    ?
                                    null
                                    :
                                    <p className={sliderStyles.imageInfoDate}>{`${setMonthName(imageInfo.date.getMonth())} ${imageInfo.date.getDay()}, ${imageInfo.date.getFullYear()}`}</p>
                                }
                                {
                                    !imageInfo.location
                                    ?
                                    null
                                    :
                                    <p className={sliderStyles.imageInfoLocation}>{imageInfo.location}</p>
                                }
                                {
                                    !imageInfo.caption
                                    ?
                                    null
                                    :
                                    <p className={sliderStyles.imageInfoCaption}>{imageInfo.caption}</p>
                                }
                            </div>
                        }
                    </div>

                </FullScreen>
            )
        }