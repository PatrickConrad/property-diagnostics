import {windowTypes} from "./windowTypes";
import { initState } from "../../constants";
import { Action, InitialState} from "../../types/stateInterfaces";
import { IHeader, IWindow } from "../../types/window";

const windowData: IWindow = {
    width:0,
    height: 0
}

export const windowState: InitialState = {
    ...initState,
    data: windowData
}

const windowReducer = (state:InitialState, action: Action) => {
    const reducerState: InitialState = state?state:windowState;
    switch(action.type){
        case windowTypes.WINDOW_RESIZE_SUCCESS: {
            const setData = action.payload?.data as IWindow;
            return {
                loading: true,
                message: 'req',
                success: true,
                data: {
                    height: setData.height,
                    width: setData.width
                }
            }
        }
        case windowTypes.WINDOW_RESIZE_FAILURE: {
            const setData = action.payload?.data as IWindow;
            return {
                loading: false,
                message: 'fail',
                success: false,
                data: {
                    height: setData.height,
                    width: setData.width
                }
            }
        }
        default: {
            return reducerState;
        }
    }
}

export default windowReducer