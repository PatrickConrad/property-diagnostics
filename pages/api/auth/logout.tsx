import { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '../../../types/authState'
import { deleteCookie, getCookies } from 'cookies-next';


type Data = {
  success: boolean,
  message: string,
  roles: Role[],
  isAuth: boolean
}

interface CookieOptions {
  expires: number,
  secure: boolean,
  httpOnly: boolean,
  sameSite: 'Lax'|'None'|'Strict',
  path: string
}

interface SetCookieType {
  name: string,
  value: string,
  exp: number,
  type?: 'client'|'',
  path?: string
}

interface SetCookieOptions {
  exp: number,
  type?: 'client' | '',
  path: string
}



const clearCookie = (req:  NextApiRequest, res: NextApiResponse<Data>, cookieName: string, cookiePath?: string, domain?: string) =>{
  deleteCookie(cookieName, { req, res, path: '/', domain: 'localhost' });
  return
}




  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    console.log("Testing logout");
    const cookies = getCookies()
    console.log({cookies});
    clearCookie(req, res, 'hasAccess');
    clearCookie(req, res, 'access');
    clearCookie(req, res, 'refresh');

    res.status(200).json({ 
      success: true, 
      message: 'success logged out',
      isAuth: false,
      roles: []
  })
  }