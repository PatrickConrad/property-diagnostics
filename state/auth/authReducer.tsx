import {authTypes} from "./authTypes";
import { initState } from "../../constants";
import { Action, InitialState, ITest} from "../../types/stateInterfaces";
import { IAuth, ITestAuth } from "../../types/authState";

const authData: ITestAuth = {
    isAuth: false,
    roles: [],
    firstName: '',
    lastName: '',
    email: '',
    id: '',
}

export const authState: InitialState = {
    ...initState,
    data: authData
}

const authReducer = (state:InitialState, action: Action) => {
    const reducerState: InitialState = state?state:authState;
    switch(action.type){
        case authTypes.CLEAR_AUTH_FAILURE: {
            return {
                loading: false,
                message: action.payload?.message??'Auth cleared',
                success: true,
                data: {
                    isAuth: false,
                    roles: [],
                    firstName: '',
                    lastName: '',
                    email: '',
                    id: ''
                }
            }
        }
        case authTypes.CLEAR_AUTH_FAILURE: {
            return {
                loading: false,
                message: action.payload?.message??'Clear auth failure',
                success: false,
                data: state.data
            }
        }
        case authTypes.LOGOUT_REQUEST: {
            return {
                loading: true,
                message: action.payload?.message??'requesting logout',
                success: true,
                data: reducerState.data
            }
        }
        case authTypes.LOGOUT_FAILURE: {
            return {
                loading: false,
                message: action.payload?.message??'Cannot logout',
                success: false,
                data: reducerState.data
            }
        }
        case authTypes.LOGOUT_SUCCESS: {
            return {
                loading: false,
                message: action.payload?.message??'Logout success',
                success: true,
                data: {
                    isAuth: false,
                    roles: [],
                    firstName: '',
                    lastName: '',
                    email: '' ,
                    id: ''
                }
            }
        }
        case authTypes.LOGIN_REQUEST: {
            return {
                loading: true,
                message: action.payload?.message??'requesting login',
                success: true,
                data: reducerState.data
            }
        }
        case authTypes.TEST_LOGIN_FAILURE: {
            return {
                loading: false,
                message: 'Cannot login',
                success: false,
                data: reducerState.data
            }
        }
        case authTypes.LOGIN_FAILURE: {
            return {
                loading: false,
                message: action.payload?.message??'Cannot login',
                success: false,
                data: reducerState.data
            }
        }
        case authTypes.TEST_LOGIN_SUCCESS: {
            const setData = action.payload?.data as ITestAuth;

            return {
                loading: false,
                message: action.payload?.message??'Login success',
                success: true,
                data: {
                    isAuth: setData.isAuth,
                    roles: [...setData.roles],
                    firstName: setData.firstName,
                    lastName: setData.lastName,
                    email: setData.email,
                    id: setData.id
                }
            }
        }
        case authTypes.LOGIN_SUCCESS: {
            const setData = action.payload?.data as ITestAuth;

            return {
                loading: false,
                message: action.payload?.message??'Login success',
                success: true,
                data: {
                    isAuth: setData.isAuth,
                    roles: [...setData.roles],
                    firstName: setData.firstName,
                    lastName: setData.lastName,
                    email: setData.email,
                }
            }
        }
        default: {
            return reducerState;
        }
    }
}

export default authReducer