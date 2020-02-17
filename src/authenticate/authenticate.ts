import { NextFunction,Response,Request } from "express";
import jsonwebtoken from 'jsonwebtoken'

export interface user{
    user?: string | undefined;
}

const jwt = jsonwebtoken;
const authenticate = async (req:(user & Request) , res:Response, next:NextFunction) => {
    // console.log(req.headers)
    const token = req.headers['authorization'] as string;
    const auth = token.split(" ")[1] as string;
    const verify = await jwt.verify(auth,<string>process.env?.JWTTOKEN)
    if (verify) {
        req.user =( verify as {token:string}).token
        return next()
    }
    req.user = undefined;
    return next()
}

export default authenticate;