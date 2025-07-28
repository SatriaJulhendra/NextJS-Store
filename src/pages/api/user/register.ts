import type { NextApiRequest, NextApiResponse } from 'next'
import { signUp } from '../../../lib/firebase/service';

export default async function hendler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        await signUp(req.body, (status : boolean) => {
            if(status){
                res.status(200).json({ status: true, statusCode : 200, massage : 'success' });
            }else{
                res.status(400).json({ status: false, statusCode : 400, massage : 'failed' });
            }
        })
    }else{
        res.status(405).json({ status: false, statusCode : 405, massage : 'Method Not Allowed' });
    }
    
    
    
    
}