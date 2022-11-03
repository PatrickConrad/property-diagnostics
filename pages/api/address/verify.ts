// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = FailureResponse | SuccessResponse;

interface SuccessResponse {
    success: true,
    message: string,
    data?: any

}

interface FailureResponse {
    success: false,
    message: any
}

interface PropertyAddress{
    address: string, 
    city: string, 
    state: string, 
    zip: number, 
    suite?: string
}

const checkAddress = async (propertyAddress: PropertyAddress) => {
    try{
        const xml = `<AddressValidateRequest USERID="${process.env.USPS_USER_ID}"><Revision>1</Revision><Address><Address1>${propertyAddress.suite??''}</Address1><Address2>${propertyAddress.address}</Address2><City>${propertyAddress.city}</City><State>${propertyAddress.state}</State><Zip5>${propertyAddress.zip}</Zip5><Zip4></Zip4></Address></AddressValidateRequest>`
        const resp = await axios.get('https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&xml='+ encodeURIComponent(xml));
        if(!resp){
            const data = {
                status: 500,
                message: 'Server Error'
            };
            return [false, data]
        }
        return [true, resp.data];
    }
    catch(err: any){
        const data = {
            status: 500,
            message: err
        };
        return [false, data]
    }
}

export default async function verifyAddress(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try{
    const reqBody = req.body.propertyAddress as PropertyAddress;
    const response = await checkAddress(reqBody);
    if(!response[0]){
        return res.status(response[1].status).json({
            success: false,
            message: response[1].message
        })
    }

  res.status(200).json({ 
    success: true, 
    message: response[1].message??'Address verification request was successful',
    data: response[1]
 })
  }
  catch(err: any){
    return res.status(500).json({
        success: false,
        message: err
    })
  }
}
