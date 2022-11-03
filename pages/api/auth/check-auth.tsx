// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Role } from '../../../types/authState'

type Data = {
  success: boolean,
  message: string,
  roles: Role[],
  isAuth: boolean
}

const getCookies = (cookieString: string)=>{
  const cookieArray = cookieString.split(';');
  const cookies = cookieArray.map(cookie=>{
    const valueArray = cookie.split('=');
     
  })

}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {



  res.status(200).json({ 
    success: true, 
    message: 'success get authorized',
    isAuth: true,
    roles: ['user']
})
}
