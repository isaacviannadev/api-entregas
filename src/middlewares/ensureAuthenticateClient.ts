import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAthenticateClient(
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
      '6e6e9e96e0c20c47e7874b69c4a33b93'
    ) as IPayload;

    req.id_client = sub;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
}
