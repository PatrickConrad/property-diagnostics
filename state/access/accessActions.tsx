import { deleteCookie, removeCookies, setCookie } from "cookies-next";
import React from "react";
import { IAuthUser, Role, SetAuthUser } from "../../types/authState";
import { Action, APIResponse } from "../../types/stateInterfaces";
import {accessTypes} from "./accessTypes";

const accessActions = {
    checkAccess: (dispatch: React.Dispatch<Action>) => async () => {
        try {
            console.log("is Running check access");
            return dispatch({
                type: accessTypes.CHECK_ACCESS_SUCCESS,
                payload: {
                    message: 'Checking access',
                }
            })

        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: accessTypes.CHECK_ACCESS_FAILURE,
                payload: {
                    message: 'Server Error',
                }
            })
        }
    },
    clearAccessCheck: (dispatch: React.Dispatch<Action>) => async () => {
        try {
            console.log("is Running clear access check");
            return dispatch({
                type: accessTypes.CLEAR_ACCESS_SUCCESS,
                payload: {
                    message: 'Clearing Access Check',
                }
            })

        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: accessTypes.CLEAR_ACCESS_FAILURE,
                payload: {
                    message: 'Server Error',
                }
            })
        }
    },

}

export default accessActions