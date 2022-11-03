import React from "react";
import { Action } from "../../types/stateInterfaces";
import {testTypes} from "./testTypes";

const testActions = {
    setTestTrue: (dispatch: React.Dispatch<Action>) => async () => {
        try {
            dispatch({
                type: testTypes.TEST_REQUEST,
                payload: {
                    data: {
                        testing: false
                    }
                }
            })
            const res = await fetch('/api/test')
            console.log({res: res.body});
            const resp = await res.json()
            console.log({resp});
            if(resp.success) {
                return dispatch({
                    type: testTypes.TEST_SUCCESS,
                    payload: {
                        data: {
                            testing: true
                        }
                    }
                })
            }
            return dispatch({
                type: testTypes.TEST_FAILURE,
                payload: {
                    data: {
                        testing: false
                    }
                }
            })
        }
        catch(err: any){
            dispatch({
                type: testTypes.TEST_FAILURE,
                payload: {
                    data: {
                        testing: false
                    }
                }
            })
        }
    }
}

export default testActions