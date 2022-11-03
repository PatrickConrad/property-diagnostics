import { deleteCookie, removeCookies, setCookie } from "cookies-next";
import React from "react";
import { IAuthUser, Role, SetAuthUser } from "../../types/authState";
import { Action, APIResponse } from "../../types/stateInterfaces";
import {authTypes} from "./authTypes";
import { users } from "../../data/users";
const authActions = {
    clearAuth: (dispatch: React.Dispatch<Action>) => async () => {
        try {

            deleteCookie('hasAccess')
            deleteCookie('client')

            return dispatch({
                type: authTypes.CLEAR_AUTH_SUCCESS,
                payload: {
                    message: 'Auth Cleared'
                }
            })
        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: authTypes.CLEAR_AUTH_FAILURE,
                payload: {
                    message: 'Could not clear auth',
                }
            })
        }
    },

    login: (dispatch: React.Dispatch<Action>) => async ({identifier, password}: IAuthUser) => {
        try {
            console.log({identifier: identifier, password: password})
            const expDate = Date.now()+300000

            console.log("is Running login");
            dispatch({
                type: authTypes.LOGIN_REQUEST
            })

            //testing 

            console.log({users});
            const user = users.filter((u)=>{
                return u.email===identifier
            })[0]
            console.log(user);
            if(!user || user.password !==password) {
                return dispatch({
                    type: authTypes.TEST_LOGIN_FAILURE
                })
            }
            const roles = user.roles as Role[]
            dispatch({
                type: authTypes.TEST_LOGIN_SUCCESS,
                payload: {
                    message: `${user.roles.includes('admin')?'Admin':null} Login Successful`,
                    data: {
                        isAuth: true,
                        roles,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: identifier,
                        id: `${user.id}`
                    }
                }
            })
            setCookie('client', identifier, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            setCookie('hasAccess', `${expDate}`, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            return;
 
            // if(identifier === 'admin@pdi.com' && password === 'adminPassword'){

            //     dispatch({
            //         type: authTypes.TEST_LOGIN_SUCCESS,
            //         payload: {
            //             message: "Admin Login Successful",
            //             data: {
            //                 isAuth: true,
            //                 roles: ['admin', 'user'],
            //                 firstName: 'Client',
            //                 lastName: 'Test',
            //                 email: identifier,
            //                 id: '1'
            //             }
            //         }
            //     })
            //     setCookie('client', identifier, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            //     setCookie('hasAccess', `true++${expDate}`, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            //     return;
            // }
            // if(identifier === 'client_test@gmail.com' && password === 'password'){

            //     dispatch({
            //         type: authTypes.TEST_LOGIN_SUCCESS,
            //         payload: {
            //             message: "Login Successful",
            //             data: {
            //                 isAuth: true,
            //                 roles: ['user'],
            //                 firstName: 'Client',
            //                 lastName: 'Test',
            //                 email: identifier,
            //                 id: '2'
            //             }
            //         }
            //     })
            //     setCookie('client', identifier, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            //     setCookie('hasAccess', `true++${expDate}`, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
                
            //     return;
            // }
           
            // const res = await fetch('/api/auth/login')
            // console.log({res: res.body});
            // const resp = await res.json() as APIResponse
            // console.log({resp});
            // if(resp.success) {
            //     return dispatch({
            //         type: authTypes.CHECK_AUTH_SUCCESS,
            //         payload: {
            //             message: resp.message??'',
            //             data: {
            //                 isAuth: true,
            //                 roles: resp.roles as Role[]
            //             }
            //         }
            //     })
            // }
            // return dispatch({
            //     type: authTypes.CHECK_AUTH_FAILURE,
            //     payload: {
            //         message: resp.message??'Response not authorized',
            //         data: {
            //             isAuth: false,
            //             roles: [],
            //         }
            //     }
            // })
        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: authTypes.LOGIN_FAILURE,
                payload: {
                    message: err.data.message??'Server Error'
                }
            })
        }
    },
    updateAccess: (dispatch: React.Dispatch<Action>) => async ({identifier}: IAuthUser) => {
        try {
            console.log('updating');
            console.log({identifier})
            const expDate = Date.now()+300000

            console.log("is Running login");
            dispatch({
                type: authTypes.LOGIN_REQUEST
                
            })

            //testing 

            const user = users.filter((u)=>{
                return u.email===identifier
            })[0]
            if(!user) {
                return dispatch({
                    type: authTypes.TEST_LOGIN_FAILURE
                })
            }
            const roles = user.roles as Role[]
            dispatch({
                type: authTypes.TEST_LOGIN_SUCCESS,
                payload: {
                    message: `${user.roles.includes('admin')?'Admin':null} Update Successful`,
                    data: {
                        isAuth: true,
                        roles,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: identifier,
                        id: `${user.id}`
                    }
                }
            })
            setCookie('client', identifier, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            setCookie('hasAccess', `${expDate}`, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            return;
 
            // if(identifier === 'admin@pdi.com'){

            //     dispatch({
            //         type: authTypes.TEST_LOGIN_SUCCESS,
            //         payload: {
            //             message: "Admin Login Successful",
            //             data: {
            //                 isAuth: true,
            //                 roles: ['admin', 'user'],
            //                 firstName: 'Client',
            //                 lastName: 'Test',
            //                 email: identifier,
            //                 id: '0'
            //             }
            //         }
            //     })
            //     setCookie('client', identifier, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            //     setCookie('hasAccess', `${expDate}`, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
                
            //     return;

            // }
            // if(identifier === 'client_test@gmail.com'){

            //     dispatch({
            //         type: authTypes.TEST_LOGIN_SUCCESS,
            //         payload: {
            //             message: "Login Successful",
            //             data: {
            //                 isAuth: true,
            //                 roles: ['user'],
            //                 firstName: 'Client',
            //                 lastName: 'Test',
            //                 email: identifier,
            //                 id: '2'
            //             }
            //         }
            //     })
            //     setCookie('client', identifier, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
            //     setCookie('hasAccess', `${expDate}`, {maxAge: expDate, secure: true, path: '/', sameSite: 'lax'})
                
            //     return;
            // }
           

            // return dispatch({
            //     type: authTypes.TEST_LOGIN_FAILURE,
                
            // })
            // const res = await fetch('/api/auth/login')
            // console.log({res: res.body});
            // const resp = await res.json() as APIResponse
            // console.log({resp});
            // if(resp.success) {
            //     return dispatch({
            //         type: authTypes.CHECK_AUTH_SUCCESS,
            //         payload: {
            //             message: resp.message??'',
            //             data: {
            //                 isAuth: true,
            //                 roles: resp.roles as Role[]
            //             }
            //         }
            //     })
            // }
            // return dispatch({
            //     type: authTypes.CHECK_AUTH_FAILURE,
            //     payload: {
            //         message: resp.message??'Response not authorized',
            //         data: {
            //             isAuth: false,
            //             roles: [],
            //         }
            //     }
            // })
        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: authTypes.LOGIN_FAILURE,
                payload: {
                    message: err.data.message??'Server Error'
                }
            })
        }
    },
    logout: (dispatch: React.Dispatch<Action>) => async () => {
        try {
            console.log("is Running Logout");
            dispatch({
                type: authTypes.LOGOUT_REQUEST,
                payload: {
                    message: "Logout requested"
                }
            })
            // const res = await fetch('/api/auth/logout')
            // console.log({res: res.body});
            // const resp = await res.json() as APIResponse
            // console.log({resp});
            // if(resp.success) {
                deleteCookie('hasAccess')
                deleteCookie('client')

                return dispatch({
                    type: authTypes.LOGOUT_SUCCESS,
                    payload: {
                        // message: resp.message??'Logout Success'
                        message: 'Logout Success'

                    }
                })
            // }
            // return dispatch({
            //     type: authTypes.LOGOUT_FAILURE,
            //     payload: {
            //         message: resp.message??'Cannot logout'
            //     }
            // })
        }
        catch(err: any){
            console.log({err});
            dispatch({
                type: authTypes.LOGOUT_FAILURE,
                payload: {
                    message: err.data.message??'Server Error'
                }
            })
        }
    },

}

export default authActions