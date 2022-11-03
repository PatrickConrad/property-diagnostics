import React from "react";
import { Action } from "../../types/stateInterfaces";
import { IHeader } from "../../types/window";
import {headerTypes} from "./headerTypes";

const headerActions = {
    setHeaderSize: (dispatch: React.Dispatch<Action>) => async ({height}: IHeader) => {
        try {
            dispatch({
                type: headerTypes.SET_HEADER_SIZE_SUCCESS,
                payload: {
                    data: {
                        height: height
                    }
                }
            })            
        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: headerTypes.SET_HEADER_SIZE_FAILURE
            })
        }
    },
    setMenuState: (dispatch: React.Dispatch<Action>) => async ({menuOpen}: IHeader) => {
        try {
            dispatch({
                type: headerTypes.SET_MENU_OPEN_SUCCESS,
                payload: {
                    data: {
                        menuOpen
                    }
                }
            })            
        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: headerTypes.SET_MENU_OPEN_FAILURE
            })
        }
    },
}

export default headerActions