import { useEffect, useContext, useMemo } from 'react';
import { ContextConsumer } from '../state/rootContext';
import { IWindow } from '../types/window';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const setWindowDimensions = () => {
  const {state, actions} = useContext(ContextConsumer);
  const setWindow = async () => {
    try{
        await actions.window?.setWindowSize(getWindowDimensions());
    }
    catch(err: any){
        console.log({err});
    }
  }
  useEffect(() => {
    setWindow()
    window.addEventListener('resize', setWindow);
    return () => window.removeEventListener('resize', setWindow);
  }, []);

  return;
}

export default setWindowDimensions;