import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// add current user type in Express Request obj
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload
        }
    }
}

// middleware function
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check jwt exist
  if (!req.session?.jwt) {
    return next();
  }

  // verify jwt
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};
