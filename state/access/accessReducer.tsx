import {accessTypes} from "./accessTypes";
import { initState } from "../../constants";
import { Action, InitialState, ITest} from "../../types/stateInterfaces";
import { IAuth, ITestAuth } from "../../types/authState";
import { IAccess } from "../../types/accessTypes";

const accessData: IAccess = {
    checking: false
}

export const accessState: InitialState = {
    ...initState,
    data: accessData
}

const accessReducer = (state:InitialState, action: Action) => {
    const reducerState: InitialState = state?state:accessState;
    switch(action.type){
        case accessTypes.CHECK_ACCESS_FAILURE: {
            return {
                ...accessState
            }
        }
        case accessTypes.CHECK_ACCESS_SUCCESS: {
            return {
                loading: false,
                message: action.payload?.message??'check access success',
                success: true,
                data: {
                    checking: true
                }
            }
        }
        case accessTypes.CLEAR_ACCESS_FAILURE: {
            return {
                ...accessState
            }
        }
        case accessTypes.CLEAR_ACCESS_SUCCESS: {
            return {
                loading: false,
                message: action.payload?.message??'clear access success',
                success: true,
                data: {
                    checking: false
                }
            }
        }
        default: {
            return reducerState;
        }
    }
}

export default accessReducer