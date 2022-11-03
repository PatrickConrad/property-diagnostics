import { NextRouter } from "next/router";

export const cookies = {
    checkCookies: () => {
        console.log("cookies");
    },
    hasAuth: () => {
        console.log("auth");
    },
    setPortalType: (cookies: string, router: NextRouter) => {
        if(cookies.includes('hasAccess')){
            
        }
    }
}
