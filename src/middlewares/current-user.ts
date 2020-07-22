import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ForbiddenError } from '../errors/forbidden-error';
import { JwtExpiredError } from '../errors/jwt-expired-error';

interface UserPayload {
  id: string;
  email: string;
}

// This gives the optional parameter of currentUser
// to the Request type object from Express
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // (!req.session || !req.session.jwt) = (!req.session?.jwt)
  if (!req.headers.authorization) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWT_KEY!
    ) as UserPayload;

    req.currentUser = payload;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new JwtExpiredError();
    }
    throw new ForbiddenError();
  }

  next();
};
