import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser | null;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'No token, not authorized' });
  }

  const token = authHeader.split(' ')[1];

  try {

    const decodedUnknown: unknown = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decodedUnknown === 'object' && decodedUnknown !== null && 'id' in decodedUnknown) {
    
      const payload = decodedUnknown as JwtPayload & { id: string };

      
      const user = await User.findById(payload.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user; 
      next();
    } else {
      return res.status(401).json({ message: 'Token invalid' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token failed' });
  }
};
