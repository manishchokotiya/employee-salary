import {Request,Response,NextFunction} from "express";
import  Jwt  from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()
export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Unauthorized');
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET||"") as any;
      (req as any).user = decoded;
      next();
    } catch {
      res.status(403).send('Invalid token');
    }
  }