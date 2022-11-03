import { Action, IState } from "../types/stateInterfaces";
import accessReducer from "./access/accessReducer";
import authReducer from "./auth/authReducer";
import headerReducer from "./header/headerReducer";
import testReducer from "./test/testReducer";
import windowReducer from "./window/windowReducer";

export const combineReducer = (state: IState, action: Action) => {
    return {
        test: testReducer(state.test, action),
        auth: authReducer(state.auth, action),
        window: windowReducer(state.window, action),
        header: headerReducer(state.header, action),
        access: accessReducer(state.access, action),
    }
}