import React from 'react';
import { IAccess } from './accessTypes';
import { IAuth, IUser, ITestAuth, IAuthUser, SetAuthUser} from './authState';
import { IHeader, IWindow } from './window'

export interface ITest {
    testing: boolean
}

export type StateTypes = IUser|IAuth|ITest|ITestAuth|IWindow|IHeader|IAccess

export interface APIResponse {
    success: boolean,
    message?: string,
    [key: string]: any
}

export type IState = {
    auth: InitialState,
    test: InitialState,
    window: InitialState,
    header: InitialState,
    access: InitialState,
}

export interface InitialState {
    loading: boolean,
    success: boolean,
    data: StateTypes,
    message: string
}

export interface IPayload {
    data?: StateTypes,
    message?: string
}

export interface Action {
    type: string,
    payload?: IPayload
}


export interface AllActions {
    [key: string]: Actions 
}

type  Args = ObjectArgs | IAuthUser

interface ObjectArgs {
    [key: string]: string | number | boolean 
}



export interface SetActions {
    [key: string]: {
        [key: string]: SetAction
    }
}

export interface Actions {
        [key: string]: LastAction
}

interface testUser {
    p: string,
    a: string,
    piss: string[]
}
export type LastAction = (dispatch: React.Dispatch<Action>)=>SetAction
export type SetAction = (args?: any )=>Promise<void>
export type SetActionNoArgs = ()=>Promise<void> 


export interface StateActions {
    [key: string]: {
        [key: string]: SetActions
    }
}

export type Reducer = (state: InitialState, action?: Action ) => InitialState

export interface Reducers {
    [key: string]: Reducer
}

export interface AppState {
    [key: string]: InitialState
}

export interface StateProps {
    children: React.ReactNode
}