import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(
      token,
      '2da0b7eba9ff3c0baa7d4cdd083c6de8'
    ) as IPayload;

    req.id_deliveryman = sub;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
}
