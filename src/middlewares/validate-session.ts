import { Response , NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import "dotenv/config"
import IGetUserAuthInfoRequest from '../interfaces/user-info-request.interface';


const validateJWT = (req:IGetUserAuthInfoRequest, res: Response, next:NextFunction) => {
    const userToken = req.header('x-token')
    if(!userToken) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    try {
        const seed = <string>process.env.PRIVATE_JWT_SEED

        req.user = jwt.verify(userToken, seed)

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
    next()
}

export default validateJWT