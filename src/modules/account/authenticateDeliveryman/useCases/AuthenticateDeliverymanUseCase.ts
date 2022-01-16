import { prisma } from '../../../../database/prismaClient';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Receber username e password

    // Verificar se username existe.
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username },
    });

    if (!deliveryman) {
      throw new Error('Username or password invalid');
    }

    // Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid');
    }

    // Gerar o token
    const token = sign({ username }, '2da0b7eba9ff3c0baa7d4cdd083c6de8', {
      subject: deliveryman.id,
      expiresIn: '1d',
    });

    return token;
  }
}
