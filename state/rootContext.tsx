import React, {createContext, useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import {combineReducer} from './reducers';
import {callAction} from './allActions';
import {testState} from './test/testReducer'
import { IState, SetActions, StateProps } from '../types/stateInterfaces';
import { authState } from './auth/authReducer';
import { windowState } from './window/windowReducer';
import { headerState } from './header/headerReducer';
import { accessState } from './access/accessReducer';

const initialState: IState = {
    auth: authState,
    test: testState,
    window: windowState,
    header: headerState,
    access: accessState
}

const GlobalState = createContext<{
    state: IState,
    actions: SetActions
}>({state: initialState, actions: {}});


const ContextProvider = (props: StateProps) => {
    const {children} = props;
    
    const [appState, setAppState] = useState<IState>(initialState)

    const [state, dispatch] = useReducer(combineReducer, initialState);

    const actions = callAction(dispatch) as SetActions;
    const setState = useCallback((state: IState, appState: IState)=>{
        state !== appState ? setAppState(state):appState;
        return appState
    }, [state, appState]);

    return (
        <GlobalState.Provider value={{state: setState(state, appState), actions}}>
            {children}
        </GlobalState.Provider>
    )
}

export {ContextProvider, GlobalState as ContextConsumer};