import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ContextConsumer } from "../../state/rootContext";
import { IAuth, IAuthUser, ITestAuth, SetAuthUser } from "../../types/authState";
import { IState } from "../../types/stateInterfaces";
import { IHeader, IWindow } from "../../types/window";
import styles from '../../styles/Pages/login.module.css'
import setStyle from "../../helpers/styleSetter";

interface Error {
    hasError: Boolean,
    message: string
}

const Login: FunctionComponent = () => {
    const {state, actions} = useContext(ContextConsumer)
    const [user, setUser] = useState<IAuthUser>({
        identifier: '',
        password: ''
    });
    const [showRegisterInfo, setShowRegisterInfo] = useState<boolean>(false)
    const {Ldiv, Linput, Lbutton, Lh1, Lform, Lspan, Llabel} = setStyle(styles, "L", ["span", "form", "label", "div", "input", "button", "h1"])

    const [pageHeight, setPageHeight] = useState<number>(400)
    const [err, setErr] = useState<Error>({
        hasError: false,
        message: ''
    });

    const router = useRouter();
    const login = async () => {
            console.log("working")
            if(!user.identifier || user.identifier === '' || !user.password || user.password === '') {
                return setErr({hasError: true, message: "Must include email and password"})
            }
            console.log("working2")

            const data = state.auth.data as IAuth;
            console.log("working3")
            if(data.isAuth){
                return setErr({hasError: true, message: "Already logged in"});
            }
            console.log("working4")
            
            setErr({hasError: false, message: ""})
            console.log("working5")

            const u: IAuthUser = user;
            await actions.auth.login(u)
            console.log("working5")

            console.log({stateAfterLogin: state});
            router.push('/auth')
            return;

        
    }

    const authState = useMemo(()=>{
        const data = state.auth.data as ITestAuth
        return data;
    }, [state.auth.data])

    useEffect(()=>{
        const data = state.auth.data as ITestAuth
        if(!data.isAuth && !state.auth.success) {
            console.log('message: ', state.auth.message);
            return;
        } 
        if(!data.isAuth) {
            return;

        } 
        if(data.roles.includes('admin')){
            router.push('/admin');
            return;

        }
        router.push('/auth');
        return;
    }, [state.auth, state.auth.loading, authState.isAuth, router])

    useEffect(()=>{
        const headerData = state.header.data as IHeader;
        const windowData = state.window.data as IWindow;
        const pageHeight = windowData.height-headerData.height!
        console.log({pageHeight});
        setPageHeight(pageHeight);
        return;
    }, [state.header.data, state.window.data])

   
  return (
    <>
        <div style={{minHeight: '400px', height: `${pageHeight}px`}} className= {styles["loginComponent"]}>
            {
            !authState.isAuth && !state.auth.loading
            ?
                <div className= {styles["authFormBox"]}>
                    <h1 className= {styles["authFormTitle"]}>Login</h1>
                    <div className= {styles["authFormTitleUnderline" ]}/>
                    <div className= {styles["authForm"]}>
                    <div className= {styles["authFormGroup"]}>
                        <div className= {styles["authFormLabelBox"]}>
                            <label htmlFor="identifier" className= {styles["authFormLabel"]}>Email: </label>
                        </div>
                        <div className= {styles["authFormLabelBox"]}>
                            <input onChange={(e)=>setUser({...user, identifier: e.target.value})} name="identifier" className={styles["authFormInput"]} type="text" placeholder="Enter your email..."/>
                        </div>
                    </div>
                    <div className= {styles["authFormGroup"]}>
                        <div className= {styles["authFormLabelBox"]}>
                            <label htmlFor="password" className= {styles["authFormLabel"]}>Password: </label>
                        </div>
                        <div className= {styles["authFormInputBox"]}>
                            <input onChange={(e)=>setUser({...user, password: e.target.value})} name="identifier" className={styles["authFormInput"]} type="password" placeholder="Enter your password..."/>
                        </div>
                    </div>
                    </div>
                    
                    {
                        !err.hasError
                        ?
                            null
                        :
                            <span className={styles["errorSpan"]} style={{color: 'red'}}>{err.message}</span>
                    }
                    <button className={styles.authFormBtn} onClick={()=>{login()}}>Login</button>
                    <div onClick={()=>setShowRegisterInfo(!showRegisterInfo)} className={styles.registerInfoBox}>
                        {
                            showRegisterInfo
                        ?
                            <>
                                <div className={styles.registrationInfo}>Please contact administrator if you have any problems logging in.</div>
                            </>
                        :
                             <div className={styles.registerInfo}>Don't have an account?</div>
                        }
                    </div>
                    
                </div>
            :
            authState.isAuth && !state.auth.loading
            ?
                <span className= {styles["loadingSpan"]}>Routing to Account Home...</span>
            :
                <span className= {styles["loadingSpan"]}>Loading...</span>
            
            }
        </div>
    </>
  )
}

export default Login