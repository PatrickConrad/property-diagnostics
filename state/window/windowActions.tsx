import React from "react";
import { Action } from "../../types/stateInterfaces";
import { IHeader, IWindow } from "../../types/window";
import {windowTypes} from "./windowTypes";

const windowActions = {
    setWindowSize: (dispatch: React.Dispatch<Action>) => async ({height, width}: IWindow) => {
        try {
            dispatch({
                type: windowTypes.WINDOW_RESIZE_SUCCESS,
                payload: {
                    data: {
                        width: width,
                        height: height
                    }
                }
            })            
        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: windowTypes.WINDOW_RESIZE_FAILURE
            })
        }
    }
}

export default windowActions