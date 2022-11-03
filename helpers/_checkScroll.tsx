import { useContext, useEffect } from 'react'
import { ContextConsumer } from '../state/rootContext';

const checkScroll = (setInView: (isInView: boolean)=>void) => {
    const wait = 500
    const handleScroll = (e: Event) => {
        setTimeout(()=>isInViewport(), wait)
    }

    const isInViewport = () => {
        if( window.scrollY >= 210){
            return setInView(false)
        }
        return setInView(true)
    }

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return;  
};

export default checkScroll;