import React from "react";
import { Action, AllActions, SetActions } from "../types/stateInterfaces";
import accessActions from "./access/accessActions";
import authActions from "./auth/authActions";
import headerActions from "./header/headerActions";
import testActions from "./test/testActions";
import windowActions from "./window/windowActions";

export const allActions: AllActions = {
    test: testActions,
    auth: authActions,
    window: windowActions,
    header: headerActions,
    access: accessActions
}

export const callAction = (dispatch: React.Dispatch<Action>) => {
    const actions: SetActions = {}
    for(let type in allActions){
        for(let act in allActions[type]){
            if(typeof allActions[type][act] !== 'function') return console.log("Not");
            const theAct = allActions[type][act];
            const dispatched = theAct(dispatch);
            actions[type] = actions[type] || {}
            actions[type][act] = dispatched
        }
        
    }

    return actions;
}