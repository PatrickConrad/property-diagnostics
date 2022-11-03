import { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '../../../types/authState'
import { setCookie } from 'cookies-next';


type Data = {
  success: boolean,
  message: string,
  roles: Role[],
  isAuth: boolean
}

interface LoginRequestBody {
  identifier: string,
  password: string
}

  export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const {identifier, password} = req.body as LoginRequestBody;
    console.log({identifier});
    console.log({password});  

    if(identifier === 'twopointtester'){
      setCookie('isLoggingIn', `true+=+${Date.now()+999999}`, {req, res, maxAge: Date.now() + 999999, path: '/', domain: 'localhost', sameSite: 'lax', secure: true, httpOnly: false})
    }
  
    else {
      setCookie('access', '12345', {req, res, maxAge: Date.now() + 1000, path: '/', domain: 'localhost', sameSite: 'lax', secure: true, httpOnly: true})
      setCookie('refresh', '12345', {req, res, maxAge: Date.now() + 999999, path: '/', domain: 'localhost', sameSite: 'lax', secure: true, httpOnly: true})
      setCookie('hasAccess', `true+=+${Date.now()+999999}`, {req, res, maxAge: Date.now() + 999999, path: '/', domain: 'localhost', sameSite: 'lax', secure: true, httpOnly: false})
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'success get authorized',
      isAuth: true,
      roles: ['user']
  })
  }