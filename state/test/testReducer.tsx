import {testTypes} from "./testTypes";
import { initState } from "../../constants";
import { Action, InitialState, ITest, Reducer } from "../../types/stateInterfaces";

const testData: ITest = {
    testing: false
}

export const testState: InitialState = {
    ...initState,
    data: testData
}

const testReducer = (state:InitialState, action: Action) => {
    const reducerState: InitialState = state?state:testState;
    switch(action.type){
        case testTypes.TEST_REQUEST: {
            const setData = action.payload?.data as ITest;
            const testData = setData.testing
            return {
                loading: true,
                message: 'req',
                success: true,
                data: {
                    testing: testData
                }
            }
        }
        case testTypes.TEST_FAILURE: {
            const setData = action.payload?.data as ITest;
            const testData = setData.testing
            return {
                loading: false,
                message: 'fail',
                success: false,
                data: {
                    testing: testData
                }
            }
        }
        case testTypes.TEST_SUCCESS: {
            const setData = action.payload?.data as ITest;
            const testData = setData.testing
            return {
                loading: false,
                message: 'success',
                success: true,
                data: {
                    testing: testData
                }
            }
        }
        default: {
            return reducerState;
        }
    }
}

export default testReducer