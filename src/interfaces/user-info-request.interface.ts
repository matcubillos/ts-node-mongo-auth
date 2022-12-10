import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

interface IGetUserAuthInfoRequest extends Request {
    user?: string | JwtPayload
  }

export default IGetUserAuthInfoRequest