import {headerTypes} from "./headerTypes";
import { initState } from "../../constants";
import { Action, InitialState } from "../../types/stateInterfaces";
import { IHeader } from "../../types/window";

const headerData: IHeader = {
    height: 0,
    menuOpen: false
}

export const headerState: InitialState = {
    ...initState,
    data: headerData
}

const headerReducer = (state:InitialState, action: Action) => {
    const reducerState: InitialState = state?state:headerState;
    switch(action.type){
        case headerTypes.SET_HEADER_SIZE_FAILURE: {
            return {
                loading: false,
                message: 'fail',
                success: false,
                data: reducerState.data,
            }
        }
        case headerTypes.SET_HEADER_SIZE_SUCCESS: {
            const setData = action.payload?.data as IHeader;
            return {
                loading: false,
                message: 'Header set',
                success: true,
                data: {
                    ...reducerState,
                    height: setData.height,
                }
            }
        }
        case headerTypes.SET_MENU_OPEN_FAILURE: {
            return {
                loading: false,
                message: 'fail',
                success: false,
                data: reducerState.data,
            }
        }
        case headerTypes.SET_MENU_OPEN_SUCCESS: {
            const setData = action.payload?.data as IHeader;
            return {
                loading: false,
                message: 'Menu set',
                success: true,
                data: {
                    ...reducerState,
                    menuOpen: setData.menuOpen,
                }
            }
        }
        default: {
            return reducerState;
        }
    }
}

export default headerReducer